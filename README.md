# Cloud Computing Final Project

## Team member
- Wang, Shih-Yu, wang6586@gmail.com
- Hsiung, Chan-Yen, chsiung@purdue.edu

## Project Description

This is a web application that allows users to search for restaurants using various filters. The project consists of two function apps which is installed on Azure: a frontend server and a backend server. MongoDB is used as the database, and the dataset is sourced from the Pune dataset provided in the Advanced Database course.

## Function Description

- **Frontend**
    - Restaurant Overview: Displays partial information about all restaurants, including the restaurant name, rating, and distance from the user’s current location.
    - Cuisine Filter: Users can select their desired region to display restaurants offering any cuisine from that region.
    - Rating Filter: Provides users with three rating ranges to choose from, displaying restaurants with ratings within the selected range.
    - Price Filter: Enables users to input their desired price range to display restaurants with prices falling within that range.
- **Backend**

    - get_all_restaurants
        - Description: Return partial information about all restaurants.
        - Input: null
        - Output: restaurants object: json
        - Link: https://ccrestaurantapi.azurewebsites.net/api/get_all_restaurants
    - get_restaurants_by_rating
        - Description: Returns all restaurants with dining_rating within the selected range.
        - Input: rating_category: str (rating_h, rating_m, rating_l)
        - Output: restaurants object: json
        - Link: https://ccrestaurantapi.azurewebsites.net/api/get_restaurants_by_rating?rating_category=rating_h

    - get_restaurants_by_price
        - Description: Returns all restaurants with pricing_for_2 within the inputed range.
        - Input: price_l: float, price_h: float
        - Output: restaurants object: json
        - Link: https://ccrestaurantapi.azurewebsites.net/api/get_restaurants_by_price?price_l=100&price_h=500

    - get_restaurants_by_region
        - Description: Returns all restaurants with category containing the selected regional cuisine.
        - Input: region: str
        - Output: restaurants object: json
        - Link: https://ccrestaurantapi.azurewebsites.net/api/get_restaurants_by_region?region=Asia

