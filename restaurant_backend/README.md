# Restaurant

Link for api: https://ccrestaurantapi.azurewebsites.net/api/[api name]

## 1. get_all_restaurants
- Input: null
- Output: a list of restaurant objects with some information

``` json
{
    "restaurant_name": "Andaground",
    "dining_rating": 4.8,
    "website": "https://www.zomato.com/pune/andaground-aundh",
    "address": "Shop A1, Sai Heritage, Near Medipoint Hospital, Aundh, Pune",
    "location": {
      "type": "Point",
      "coordinates": [73.80060285, 18.56529653]
    }
}
```

## 2. get_restaurants_by_rating
- Input: rating_l, rating_h
- Output: restaurants object whose rating in the range (greater than, lower than or equal)

``` json
{
    "_id": "674792e64ae29e74498397e6",
    "restaurant_name": "Andaground",
    "category": [
      "Fast Food",
      "Street Food",
      "North Indian",
      "Beverages"
    ],
    "pricing_for_2": 600,
    "locality": "Aundh, Pune",
    "dining_rating": 4.8,
    "dining_review_count": 785,
    "delivery_rating": 4.3,
    "delivery_rating_count": 315,
    "website": "https://www.zomato.com/pune/andaground-aundh",
    "address": "Shop A1, Sai Heritage, Near Medipoint Hospital, Aundh, Pune",
    "known_for_food": [
      "Keema Ghotala",
      "Australian Fry",
      "Chicken Omelette",
      "Masala Maggi",
      "Sunny Side",
      "Chicken Kheema"
    ],
    "known_for_atmos": [
      "Bang for the Buck",
      "Elegantly Decorated",
      "Great Recommendations",
      "Pocket Friendly",
      "Good Crowd",
      "Polite Staff"
    ],
    "location": {
      "type": "Point",
      "coordinates": [73.80060285, 18.56529653]
    }
}
```

## 3. get_restaurants_by_price
- Input: price_l, price_h
- Output: restaurants object whose price in the range (greater than, lower than or equal)

``` json
same as get_restaurants_by_rating
```

## 4. get_restaurants_by_region 
- Input: region (Asia, Americas, Europe, Other)
- Output: restaurants object whose known_for_food contains the specified cuisines

``` json
same as get_restaurants_by_rating
```