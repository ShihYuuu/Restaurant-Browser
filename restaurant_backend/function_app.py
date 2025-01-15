import os
import azure.functions as func
from pymongo import MongoClient
import json
from datetime import datetime, date
from decimal import Decimal
# from variables import cuisine_categories


cuisine_categories = {
      "Asia": {
        "India": ["Indian", "Indian", "Gujarati", "Bengali", "Hyderabadi", "Malwani", "Maharashtrian", "Andhra", "Chettinad", "Mangalorean"],
        "China": ["Chinese", "Cantonese", "Tibetan", "Mongolian"],
        "Japan": ["Japanese", "Sushi"],
        "Korea": ["Korean"],
        "Southeast Asia": ["Thai", "Vietnamese", "Malaysian", "Indonesian", "Singaporean"],
        "Middle East": ["Middle Eastern", "Lebanese", "Turkish", "Arabian"],
      },
      "Americas": {
        "United States": ["American", "BBQ", "Fast Food", "Burger", "Hot dogs"],
        "South America": ["Brazilian", "South American"],
      },
      "Europe": {
        "Italy": ["Italian", "Pizza", "Pasta"],
        "United Kingdom": ["British"],
        "France": ["French"],
        "Germany": ["German"],
      },
      "Other": {
        "Africa": ["Egyptian", "Moroccan"],
        "Other": ["Jamaican", "Afghan", "Iranian"],
      }
}

headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
}

def get_collection(db_name = 'pune', collection_name = 'restaurants'):
    connection_string = os.getenv('MONGO_DB_CONNECTION_STRING')
    
    # Connect to MongoDB
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]

    return collection

# Defines the function app an an anonymous function
app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)


# A single API endpoint to test that the deployment is working
@app.route(route="hello", auth_level=func.AuthLevel.ANONYMOUS)
def hello(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
            "Hello!",
            status_code=200
    )

@app.route(route="get_all_restaurants")
def get_all_restaurants(req: func.HttpRequest) -> func.HttpResponse:

    collection = get_collection()

    try:
        # Query to get all restaurants name
        restaurants = list(collection.find(
            {},
            {"_id": 0,
             "restaurant_name": 1,
             "website": 1,
             "dining_rating": 1,
             "address": 1,
             "location": 1
             }
        ))

        # Convert the sample orders to a JSON array
        json_response = json.dumps(restaurants, default=str)

        # Return HTTP response with CORS headers
        return func.HttpResponse(
            json_response,
            mimetype="application/json",
            status_code=200,
            headers=headers
        )
    
    except Exception as e:
        return func.HttpResponse(
            str(e),
            status_code=500,
            headers=headers
        )
    
    
@app.route(route="get_restaurants_by_rating")
def get_restaurants_by_rating(req: func.HttpRequest) -> func.HttpResponse:
    
    rating_category = req.params.get("rating_category")

    if not rating_category:
        return func.HttpResponse(
            "Please provide a 'rating_category' parameter (rating_h, rating_m, or rating_l).",
            status_code=400
        )

    collection = get_collection()

    try:
        
        if rating_category == "rating_h":
            rating_l = 4.7
            rating_h = 5.0
            
        elif rating_category == "rating_m":
            rating_l = 4.3
            rating_h = 4.7

        elif rating_category == "rating_l":
            rating_l = 0.0
            rating_h = 4.3
            
        else:
            return func.HttpResponse(
                "Invalid 'rating_category' value. Must be one of: rating_h, rating_m, rating_l.",
                status_code=400
            )

        query = {
            "dining_rating": {
                "$gte": rating_l,
                "$lte": rating_h
            }
        }
        
        restaurants = list(collection.find(query, {
            "_id": 0,
            "restaurant_name": 1,
            "dining_rating": 1,
            "address": 1,
            "website": 1
        }).sort("dining_rating", -1))

        # 返回结果
        json_response = json.dumps({
            rating_category: restaurants
        }, default=str)

        return func.HttpResponse(
            json_response,
            mimetype="application/json",
            status_code=200,
            headers=headers
        )
    
    except Exception as e:
        return func.HttpResponse(
            str(e),
            mimetype="application/json",
            status_code=500,
            headers=headers
        )
    
@app.route(route="get_restaurants_by_price")
def get_restaurants_by_price(req: func.HttpRequest) -> func.HttpResponse:

    price_l = req.params.get('price_l')
    price_h = req.params.get('price_h')

    collection = get_collection()

    try:

        if price_l == 'null' and  price_h == 'null':
            restaurants = list(collection.find({}))
            
        elif price_l == 'null':
            restaurants = list(collection.find({
                "pricing_for_2": {
                    "$lte": float(price_h)
                }
            }))

        elif price_h == 'null':
            restaurants = list(collection.find({
                "pricing_for_2": {
                    "$gte": float(price_l),
                }
            }))

        else: 
            restaurants = list(collection.find({
                "pricing_for_2": {
                    "$gte": float(price_l),
                    "$lte": float(price_h)
                }
            }))

        # Convert the sample orders to a JSON array
        json_response = json.dumps(restaurants, default=str)

        return func.HttpResponse(
            json_response,
            mimetype="application/json",
            status_code=200,
            headers=headers
        )
    
    except Exception as e:
        return func.HttpResponse(
            str(e),
            mimetype="application/json",
            status_code=500,
            headers=headers
        )

@app.route(route="get_restaurants_by_region")
def get_restaurants_by_region(req: func.HttpRequest) -> func.HttpResponse:

    region = req.params.get('region')

    collection = get_collection()

    # Get all cuisines in region
    cuisines = []
    for country in cuisine_categories[region]:
        cuisines += cuisine_categories[region][country]

    try:
        # Query to get all restaurants name
        restaurants = list(collection.find({
            "category": {
                "$in": cuisines
            }
        }))

        # Convert the sample orders to a JSON array
        json_response = json.dumps(restaurants, default=str)

        return func.HttpResponse(
            json_response,
            mimetype="application/json",
            status_code=200,
            headers=headers
        )
    
    except Exception as e:
        return func.HttpResponse(
            str(e),
            mimetype="application/json",
            status_code=500,
            headers=headers
        )
