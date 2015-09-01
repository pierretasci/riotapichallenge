# Black Market Browser
This project is the submission for Pierre Tasci(@duderduderes) and Armen Ourfalian(@anjartsi) to the **Riot API Challenege 2.0**.

## Basic Info
This submission is for the first of the three challenges: *Given a data set of Black Market Brawlers match IDs, create a piece of software that utilizes the game data from these matches. You can download the data set here.*

The Black Market Browser takes a set of match data for black market matches and for each champion shows a visual representation of what items helped players win those matches. A graphic plots the intersection of how often and item was built and how often it won. A longer list shows the full build set for different players that used that champion and whether they won or not. 

We also included a search feature.

## Technical Information
We realized early on that there were too many matches to be able to call the api on all of them. Therefore, we sequentially called the api every 10 seconds over the course of a few days to build a cache of the match data that we indexed by champion. We use that for most of the information on the page.

The other APIs we use include some of the static APIs for champion and item data.

## See it in action! 
You can view the live version of the tool at http://blackmarketbrowser.herokuapp.com
