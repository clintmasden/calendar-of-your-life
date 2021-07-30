# Calendar of Your Life

An interactive Angular 2+ web application inspired by Kurzgesagt's [Calendar of Your Life Infographic](https://shop-us.kurzgesagt.org/collections/existential-dread/products/lifespan-calendar-poster?variant=39451596423216) poster.

## Usage
+ Enter your birthday in top right and press `Set Birthday`. 
    * This will generate the calendar and will update the view
+ Each week has a summary where you can enter in any event(s).  
    * Any week that has an event will have a filled circle
+ The current year will be outlined in yellow, the current week will be outlined white with a bell.
+ All information is saved in local storage and be opened, saved, and cleared.
    * Save - Saves the calendar information to a json file
    * Open - Opens and loads the calendar json file
    * Clear - Clears local storage

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:4200
$ ng serve

# build for production
$ ng build
$ ng build --prod
```

## Further Resources

[Life Calendar (JS)](https://github.com/wcoder/life-calendar)

[Calendar Of Your Life (Poster) (Vue)](https://github.com/Abbondanzo/calendar-of-your-life)

[Life Calendar Idea](http://waitbutwhy.com/2014/05/life-weeks.html)

