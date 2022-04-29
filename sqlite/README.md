$ pip install twitter-to-sqlite
$ twitter-to-sqlite search stop_russian_gas.db "https://corporateeurope.org/en/2022/04/stop-fossil-fuels-hijacking-eu-response-ukraine" --since


sqlite3:
select count(*) from tweets;
319
select count(*) from users;
134
select screen_name, followers_count from users order by followers_count desc limit 20;
