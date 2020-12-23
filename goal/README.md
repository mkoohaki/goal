```
Author: Meisam Koohaki
Web Framework and APIs
Fall, 2020

--------------------------------------------------------------------------------------------------------------------------------------

Use these links in .env:

PORT=3001
DATABASE_URL=mongodb+srv://db-admin:y72AaPWHs9Bbn7p0@cluster0.7mjxd.mongodb.net/Goal?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET = '123456789poiuytrewq'
API_GOOGLE='779978570887-kg10t57q8rbntpavgtdnoqjqr7cbv3i5.apps.googleusercontent.com'
API_GOOGLE_PASSWORD='8okWxgCwsCCNKj_v7KA414IG'

--------------------------------------------------------------------------------------------------------------------------------------

This application has five models:

1. user.js --> User : databse of users.


2. google.js --> Google : databse of users who sign in with google account. I  created authentication of Google API:
API_GOOGLE='779978570887-kg10t57q8rbntpavgtdnoqjqr7cbv3i5.apps.googleusercontent.com'
API_GOOGLE_PASSWORD='8okWxgCwsCCNKj_v7KA414IG'


3. game.js --> Game : information of 10 years of europian leagues matches - user can add some information in json format with update.js   (update.pug) in this database. Application use it in history.js (history.pug) to whow the football history. Application save the files in public/storage and creates new folder as the file name, then read it and save the data in the database. These are the first APIs: 


http://localhost:3001/history/api : returns all 10 years history ins+clud 18260 records (GET) if the application is logged in.

http://localhost:3001/history/api/username/password : returns all 10 years history ins+clud 18260 records (GET) if using username and password which used for account registration.

http://localhost:3001/history/api/google-username : returns all 10 years history ins+clud 18260 records (GET) if using google username which used for account registration by Google API.


http://localhost:3001/history/api/?  : accepts the key words as below and return all 10 years leagues match of each country (GET) if the application is logged in.
                                        england/eng/english/premier-league'/english-premier-league
                                        france/fr/french/ligue-1/french-ligue-1
                                        germany/german/dutchland/bundesliga/german-bundesliga
                                        italy/italian/serie-a'/italian-serie-a
                                        spain/sp/spanish/la-liga/spanish-la-liga

http://localhost:3001/history/api/?/username/password  : accepts the key words as below and return all 10 years leagues match of each country (GET) if using username and password which used for account registration.
                                        england/eng/english/premier-league'/english-premier-league
                                        france/fr/french/ligue-1/french-ligue-1
                                        germany/german/dutchland/bundesliga/german-bundesliga
                                        italy/italian/serie-a'/italian-serie-a
                                        spain/sp/spanish/la-liga/spanish-la-liga

http://localhost:3001/history/api/?/google-username  : accepts the key words as below and return all 10 years leagues match of each country (GET) if using google username which used for account registration by Google API.
                                        england/eng/english/premier-league'/english-premier-league
                                        france/fr/french/ligue-1/french-ligue-1
                                        germany/german/dutchland/bundesliga/german-bundesliga
                                        italy/italian/serie-a'/italian-serie-a
                                        spain/sp/spanish/la-liga/spanish-la-liga


http://localhost:3001/history/api/?/? : accepts the key words as below and return specific year leagues match history (GET) if the application is logged in.
                                        england/eng/english/premier-league'/english-premier-league
                                        france/fr/french/ligue-1/french-ligue-1
                                        germany/german/dutchland/bundesliga/german-bundesliga
                                        italy/italian/serie-a'/italian-serie-a
                                        spain/sp/spanish/la-liga/spanish-la-liga

                                        9/09/2009/2009-10/2009-2010/2009-10
                                        10/2010/2010-11/2010-2011/2010-11
                                        11/2011/2011-12/2011-2012/2011-12
                                        12/2012/2012-13/2012-2013/2012-13
                                        13/2013/2013-14/2013-2014/2013-14
                                        14/2014/2014-15/2014-2015/2014-15
                                        15/2015/2015-16/2015-2016/2015-16
                                        16/2016/2016-17/2016-2017/2016-17
                                        17/2017/2017-18/2017-2018/2017-18
                                        18/2018/2018-19/2018-2019/2018-19

http://localhost:3001/history/api/?/?/username/password : accepts the key words as below and return specific year leagues match history (GET) if using username and password which used for account registration.
                                        england/eng/english/premier-league'/english-premier-league
                                        france/fr/french/ligue-1/french-ligue-1
                                        germany/german/dutchland/bundesliga/german-bundesliga
                                        italy/italian/serie-a'/italian-serie-a
                                        spain/sp/spanish/la-liga/spanish-la-liga

                                        9/09/2009/2009-10/2009-2010/2009-10
                                        10/2010/2010-11/2010-2011/2010-11
                                        11/2011/2011-12/2011-2012/2011-12
                                        12/2012/2012-13/2012-2013/2012-13
                                        13/2013/2013-14/2013-2014/2013-14
                                        14/2014/2014-15/2014-2015/2014-15
                                        15/2015/2015-16/2015-2016/2015-16
                                        16/2016/2016-17/2016-2017/2016-17
                                        17/2017/2017-18/2017-2018/2017-18
                                        18/2018/2018-19/2018-2019/2018-19

http://localhost:3001/history/api/?/?/google-username : accepts the key words as below and return specific year leagues match history (GET) if using google username which used for account registration by Google API.
                                        england/eng/english/premier-league'/english-premier-league
                                        france/fr/french/ligue-1/french-ligue-1
                                        germany/german/dutchland/bundesliga/german-bundesliga
                                        italy/italian/serie-a'/italian-serie-a
                                        spain/sp/spanish/la-liga/spanish-la-liga

                                        9/09/2009/2009-10/2009-2010/2009-10
                                        10/2010/2010-11/2010-2011/2010-11
                                        11/2011/2011-12/2011-2012/2011-12
                                        12/2012/2012-13/2012-2013/2012-13
                                        13/2013/2013-14/2013-2014/2013-14
                                        14/2014/2014-15/2014-2015/2014-15
                                        15/2015/2015-16/2015-2016/2015-16
                                        16/2016/2016-17/2016-2017/2016-17
                                        17/2017/2017-18/2017-2018/2017-18
                                        18/2018/2018-19/2018-2019/2018-19


4. url.js --> URL : databse from rest API https://www.scorebat.com/video-api/v1/ which provide the results and videos of each match. Application saves the new updates automatically everythime it runs and store the information in this databse.


5. play.js --> Play : database of new matches with the video link. For this reason, user input the match information in video.js (video.pug) and application find the match in the URL databse and save the video link, league name, and title of video, this is POST method for API (attention the format of the date according the URL database format like 2020-11-04T11:00:00+0000). This is the second API :


http://localhost:3001/video/api : returns the match videos links (GET) if the application is logged in.

http://localhost:3001/video/api/username/password : returns the match videos links (GET) if using username and password which used for account registration.

http://localhost:3001/video/api/google-username : returns the match videos links (GET) if using google username which used for account registration by Google API.

--------------------------------------------------------------------------------------------------------------------------------------

I added react in 'goal-admin' for some activities, but the main is the 'goal'. PORT of goal-admin is 3000.

--------------------------------------------------------------------------------------------------------------------------------------

There is an Admin account which can updates the APIs, although the dataset url update automatically. You can use username: 'admin' and password: '6465' to see the changes in the pages.

--------------------------------------------------------------------------------------------------------------------------------------

```