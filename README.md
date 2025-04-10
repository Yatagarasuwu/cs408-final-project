# Web Dev Starter Code

## Project Spec

- What is the general theme? For example, a photo gallery, recipe repository, Twitter clone, e-commerce inventory, API-driven data mining, generic wedding, a message board for the class, dentistry, etc.

The general theme for this project is to be an ELO-based ranking website for various games/sports. It will have a leaderboard system/page, dedicated player match history pages, a match reporting page, and a "looking for game/league" page/forum. 

As an aside, for those who don't know what the ELO system is, it is how Chess and various other games determine player skill. In general, it assigns a number "rating" that suggests if a user should lose or win to another user. As an example, lets assume there are two imaginary players: "player 1",  at  1500 elo and "player 2" with 1200 elo,  In this scenario, it is assumed there is a high likelyhood player 1 would win. Therefore, the system would give player 1 a low amount of elo for winning, and, in turn, would give player 2 a tremendous amount of elo for winning; the same is inversed for losses.  You can read more about it here, if you are interested: https://www.chess.com/terms/elo-rating-chess.

- What is it going to do? For example: draw customers to a photography business by showing a portfolio, pricing, contact information, and booking. Mine data from IMDB to answer questions about movies and movie stars. Forum to facilitate communication between users. Etc.

The main goal of the website is to calculate ELO based on submitted match data. Essentially, it will be a "player-hub" of sorts that will allow users to report their scores to the provided form. The reason to use this is that it will provide immediate updates to the ELO rankings and leaderboard listings. Alongside the   ELO rankings, it becomes a sort of "match history" the player can look back on. Importantly, for each of the matches given, there will be a notes/comments section, so players can look back at their thoughts and revise their strategies as they please.

- Who is the target audience? For example: The general public, family members, research scientists, students, etc.

These are the people that come to mind for me: Competitive players, Game devs, and League Organizers.

Competitive Players: Profesionals / hobbiysts for gaming or sports and are eager to see a true reflection of their skills through updated ELO rankings.

Game Developers: Developers looking for a reliable system to integrate into their games, offering both backend support for ELO computation and a robust front-end to display dynamic statistics. (This is more reasonably with stretchgoals implemented rather than just the website-based iteration..)

League Organizers: Organizations hosting leagues can use the platform to manage  their players, track match results, and ensure that the best players are displayed.

 
- What sort of data will it manage? This doesn’t include static data, such as logos, headers, and footers. Think of any data that will be dynamically generated based on user form input. For example, user comments, uploaded images, credit cards, etc.

The first and most obvious form of dynamic input would be the match data mentioned previously. This will include game scores, userr id's/usernames, what game/competiton occured, what date it occured, and if it was recorded the match footage. Furthermore, we will be creating our own data based on the user-input in the form of elo. Therefore, we will not only be managing what the user gives, but also all the leaderboard positions and ELO scores from their data.  Stemming off of this, we create player profiles / match histories, where users can further add data in the form a notes section for each match/set.  


- Stretch Goals? Once your project is fully functional and demonstrates adequate scope, what extra features do you want to implement? What additional gold plating would make your website utterly awesome? Stretch goals aren’t part of your grade; they are just for your own satisfaction.

I cannot promise that it would really be a 'working" leaderboard site without loopholes. While it would be nice, security/authorization for users would be a *stretch* goal for this project, as I am mostly making this as a demonstration of the skills I have learned in this course, not as a fully functioning application. Another thing I would focus on if I had more time to implement as many features as I wanted would be a sophisticated matchmaking system. Usually, ELO helps towards making a fully fledged product that allows players to find matches. However, I feel like implementing this is unfit for what this project is intended to be.  

## Project Wireframe

 Replace the wireframe below with your own design.
 

Leaderboard Section:

Link:

https://app.moqups.com/QOCtH5WYfgJSpqKcgEnz8EN76IAxxloG/view/page/ad64222d5

Picture:

![image](https://github.com/user-attachments/assets/4b1030bd-6e58-4b06-9586-b2d1b7a0e7e0)



Match Report Form:

Link:

https://app.moqups.com/1tuIZ2ujPQvqqmMkpkBsZ0Gwce8bQccY/view/page/ad64222d5

Picture:

![image](https://github.com/user-attachments/assets/dc0558af-e4c6-4574-974a-97f1a6403ee2)


P.S. I don't fully like this design, I will definitely change it at somepoint.. Something about having the full page be a form is off...

Match History Page:

Link:

https://app.moqups.com/7TVjVr1VqYQhvYVl5UW3cmGVHz8aBMll/view/page/ad64222d5

Picture:

![image](https://github.com/user-attachments/assets/e926b802-7c49-40fa-98d9-c3dff434c550)


Forum area:

Link:

https://app.moqups.com/thxACATJTmSK3zGSRtxcdOwqChOaGl6g/view/page/ad64222d5

Picture:

![image](https://github.com/user-attachments/assets/49901aac-f151-44cf-9bde-4576242b46b9)

P.S. This is by far the section of the project im the most shaky on. I don't even know if this *will* be my fourth page, its just what I have for now.




