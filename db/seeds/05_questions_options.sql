
-- Questions for Animals
insert into questions (id, question) values (1, 'What was the name of the Ethiopian Wolf before they knew it was related to wolves?');
-- // Options for "Animals" question 1
insert into options (id, option) values (1, 'Simien Jackel');
insert into options (id, option) values (2, 'Ethiopian Coyote');
insert into options (id, option) values (3, 'Amharic Fox');
insert into options (id, option) values (4, 'Canis Simiensis');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (1, 1, 1);
-- correct answer for question 1 Animals
insert into question_answer (id, question_id, answer_id) values (1, 1, 1);
-- other possible options for question 1 Animals
insert into question_option (id, question_id, option_id) values (1, 1, 2);
insert into question_option (id, question_id, option_id) values (2, 1, 3);
insert into question_option (id, question_id, option_id) values (3, 1, 4);

------
insert into questions (id, question) values (2, 'For what reason would a spotted hyena laugter');
-- // Options for "Animals" question 2
insert into options (id, option) values (5, 'Nervousness');
insert into options (id, option) values (6, 'Excitement');
insert into options (id, option) values (7, 'Aggression');
insert into options (id, option) values (8, 'Exhaustion');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (2, 1, 2);
-- correct answer for question 2 Animals
insert into question_answer (id, question_id, answer_id) values (2, 2, 5);
-- other possible options for question 2 Animals
insert into question_option (id, question_id, option_id) values (4, 2, 6);
insert into question_option (id, question_id, option_id) values (5, 2, 7);
insert into question_option (id, question_id, option_id) values (6, 2, 8);

------
insert into questions (id, question) values (3, 'What is Grumpy Cats real name?');
-- // Options for "Animals" question 3
insert into options (id, option) values (9, 'Tardar Sauce');
insert into options (id, option) values (10, 'Sauce');
insert into options (id, option) values (11, 'Minnie');
insert into options (id, option) values (12, 'Broccoli');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (3, 1, 3);
-- correct answer for question 3 Animals
insert into question_answer (id, question_id, answer_id) values (3, 3, 9);
-- other possible options for question 3 Animals
insert into question_option (id, question_id, option_id) values (7, 3, 10);
insert into question_option (id, question_id, option_id) values (8, 3, 11);
insert into question_option (id, question_id, option_id) values (9, 3, 12);

------
insert into questions (id, question) values (4, 'Which species is a mountain chicken?');
-- // Options for "Animals" question 4
insert into options (id, option) values (13, 'Frog');
insert into options (id, option) values (14, 'Chicken');
insert into options (id, option) values (15, 'Horse');
insert into options (id, option) values (16, 'Fly');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (4, 1, 4);
-- correct answer for question 4 Animals
insert into question_answer (id, question_id, answer_id) values (4, 4, 13);
-- other possible options for question 4 Animals
insert into question_option (id, question_id, option_id) values (10, 4, 14);
insert into question_option (id, question_id, option_id) values (11, 4, 15);
insert into question_option (id, question_id, option_id) values (12, 4, 16);

------
insert into questions (id, question) values (5, 'What is the collective noun for rats?');
-- // Options for "Animals" question 5
insert into options (id, option) values (17, 'Mischief');
insert into options (id, option) values (18, 'Pack');
insert into options (id, option) values (19, 'Race');
insert into options (id, option) values (20, 'Drift');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (5, 1, 5);
-- correct answer for question 5 Animals
insert into question_answer (id, question_id, answer_id) values (5, 5, 17);
-- other possible options for question 5 Animals
insert into question_option (id, question_id, option_id) values (13, 5, 18);
insert into question_option (id, question_id, option_id) values (14, 5, 19);
insert into question_option (id, question_id, option_id) values (15, 5, 20);



-- Questions for Sports

insert into questions (id, question) values (6, 'Which team won the 2015-16 English Premier League?');
-- // Options for "Sports" question 1
insert into options (id, option) values (21, 'Leicester City');
insert into options (id, option) values (22, 'Liverpool');
insert into options (id, option) values (23, 'Cheslea');
insert into options (id, option) values (24, 'Manchester United');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (6, 2, 6);
-- correct answer for question 1 Sports
insert into question_answer (id, question_id, answer_id) values (6, 6, 21);
-- other possible options for question 1 sports
insert into question_option (id, question_id, option_id) values (16, 6, 22);
insert into question_option (id, question_id, option_id) values (17, 6, 23);
insert into question_option (id, question_id, option_id) values (18, 6, 24);

------
insert into questions (id, question) values (7, 'What was the final score of the Germany vs. Brazil 2014 FIFA World Cup match?');
-- // Options for "Sports" question 2
insert into options (id, option) values (25, '7-1');
insert into options (id, option) values (26, '0-1');
insert into options (id, option) values (27, '3-4');
insert into options (id, option) values (28, '16-0');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (7, 2, 7);
-- correct answer for question 2 Sports
insert into question_answer (id, question_id, answer_id) values (7, 7, 25);
-- other possible options for question 2 sports
insert into question_option (id, question_id, option_id) values (19, 7, 26);
insert into question_option (id, question_id, option_id) values (20, 7, 27);
insert into question_option (id, question_id, option_id) values (21, 7, 28);

-----
insert into questions (id, question) values (8, 'How many points did LeBron James score in his first NBA game?');
-- // Options for "Sports" question 3
insert into options (id, option) values (29, '25');
insert into options (id, option) values (30, '16');
insert into options (id, option) values (31, '69');
insert into options (id, option) values (32, '41');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (8, 2, 8);
-- correct answer for question 3 Sports
insert into question_answer (id, question_id, answer_id) values (8, 8, 29);
-- other possible options for question 3 sports
insert into question_option (id, question_id, option_id) values (22, 8, 30);
insert into question_option (id, question_id, option_id) values (23, 8, 31);
insert into question_option (id, question_id, option_id) values (24, 8, 32);


-----
insert into questions (id, question) values (9, 'When was the FC Schalke 04 founded?');
-- // Options for "Sports" question 4
insert into options (id, option) values (33, '1904');
insert into options (id, option) values (34, '1909');
insert into options (id, option) values (35, '2008');
insert into options (id, option) values (36, '1999');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (9, 2, 9);
-- correct answer for question 4 Sports
insert into question_answer (id, question_id, answer_id) values (9, 9, 33);
-- other possible options for question 4 sports
insert into question_option (id, question_id, option_id) values (26, 9, 34);
insert into question_option (id, question_id, option_id) values (27, 9, 35);
insert into question_option (id, question_id, option_id) values (28, 9, 36);


------
insert into questions (id, question) values (10, 'In the 2014 FIFA World Cup, what was the final score in the match Brazil - Germany?');
-- // Options for "Sports" question 5
insert into options (id, option) values (37, '1-7');
insert into options (id, option) values (38, '1-5');
insert into options (id, option) values (39, '1-6');
insert into options (id, option) values (40, '2-6');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (10, 2, 10);
-- correct answer for question 5 Sports
insert into question_answer (id, question_id, answer_id) values (10, 10, 37);
-- other possible options for question 5 sports
insert into question_option (id, question_id, option_id) values (29, 10, 38);
insert into question_option (id, question_id, option_id) values (30, 10, 39);
insert into question_option (id, question_id, option_id) values (31, 10, 40);




-- Questions for Vehicles
insert into questions (id, question) values (11, 'The Italian automaker Lamborghini uses what animal as its logo?');
-- // Options for "Vehicles" question 1
insert into options (id, option) values (41, 'Bull');
insert into options (id, option) values (42, 'Bat');
insert into options (id, option) values (43, 'Horse');
insert into options (id, option) values (44, 'Snake');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (11, 3, 11);
-- correct answer for  "Vehicles" question 1
insert into question_answer (id, question_id, answer_id) values (11, 11, 41);
-- other possible options for  "Vehicles" question 1
insert into question_option (id, question_id, option_id) values (32, 11, 42);
insert into question_option (id, question_id, option_id) values (33, 11, 43);
insert into question_option (id, question_id, option_id) values (34, 11, 44);

-----
insert into questions (id, question) values (12, 'Which of the following car manufacturers had a war named after it?');
-- // Options for "Vehicles" question 2
insert into options (id, option) values (45, 'Toyota');
insert into options (id, option) values (46, 'Honds');
insert into options (id, option) values (47, 'Ford');
insert into options (id, option) values (48, 'Volkswagen');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (12, 3, 12);
-- correct answer for  "Vehicles" question 2
insert into question_answer (id, question_id, answer_id) values (12, 12, 45);
-- other possible options for  "Vehicles" question 2
insert into question_option (id, question_id, option_id) values (35, 12, 46);
insert into question_option (id, question_id, option_id) values (36, 12, 47);
insert into question_option (id, question_id, option_id) values (37, 12, 48);


------
insert into questions (id, question) values (13, 'Jaguar Cars was previously owned by which car manfacturer?');
-- // Options for "Vehicles" question 3
insert into options (id, option) values (49, 'Ford');
insert into options (id, option) values (50, 'Chrysler');
insert into options (id, option) values (51, 'General Motors');
insert into options (id, option) values (52, 'Fiat');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (13, 3, 13);
-- correct answer for  "Vehicles" question 3
insert into question_answer (id, question_id, answer_id) values (13, 13, 49);
-- other possible options for  "Vehicles" question 3
insert into question_option (id, question_id, option_id) values (38, 13, 50);
insert into question_option (id, question_id, option_id) values (39, 13, 51);
insert into question_option (id, question_id, option_id) values (40, 13, 52);


-----
insert into questions (id, question) values (14, 'Which of the following collision avoidance systems helps airplanes avoid colliding with each other?');
-- // Options for "Vehicles" question 4
insert into options (id, option) values (53, 'TCAS');
insert into options (id, option) values (54, 'GPWS');
insert into options (id, option) values (55, 'OCAS');
insert into options (id, option) values (56, 'TAWS');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (14, 3, 14);
-- correct answer for  "Vehicles" question 4
insert into question_answer (id, question_id, answer_id) values (14, 14, 53);
-- other possible options for  "Vehicles" question 4
insert into question_option (id, question_id, option_id) values (41, 14, 54);
insert into question_option (id, question_id, option_id) values (42, 14, 55);
insert into question_option (id, question_id, option_id) values (43, 14, 56);


------
insert into questions (id, question) values (15, 'Which car tire manufacturer is famous for its P Zero line');
-- // Options for "Vehicles" question 5
insert into options (id, option) values (57, 'Pirelli');
insert into options (id, option) values (58, 'Goodyear');
insert into options (id, option) values (59, 'Bridgestone');
insert into options (id, option) values (60, 'Michelin');

-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (15, 3, 15);
-- correct answer for  "Vehicles" question 5
insert into question_answer (id, question_id, answer_id) values (15, 15, 57);
-- other possible options for  "Vehicles" question 5
insert into question_option (id, question_id, option_id) values (44, 15, 58);
insert into question_option (id, question_id, option_id) values (45, 15, 59);
insert into question_option (id, question_id, option_id) values (46, 15, 60);



-- Questions for Celebrities
insert into questions (id, question) values (16, 'Which actress married Michael Douglas in 2000?');
-- // Options for "Celebrities" question 1
insert into options (id, option) values (61, 'Catherine Zeta-Jones');
insert into options (id, option) values (62, 'Ruth Jones');
insert into options (id, option) values (63, 'Pam Ferris');
insert into options (id, option) values (64, 'Sara Sugarman');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (16, 4, 16);
-- correct answer for  "Celebrities" question 1
insert into question_answer (id, question_id, answer_id) values (16, 16, 61);
-- other possible options for  "Celebrities" question 1
insert into question_option (id, question_id, option_id) values (47, 16, 62);
insert into question_option (id, question_id, option_id) values (48, 16, 63);
insert into question_option (id, question_id, option_id) values (49, 16, 64);


-----
insert into questions (id, question) values (17, 'What does film maker Dan Bell typically focus his films on?');
-- // Options for "Celebrities" question 2
insert into options (id, option) values (65, 'Abandoned Buildings and Dead Malls');
insert into options (id, option) values (66, 'Historic Landmarks');
insert into options (id, option) values (67, 'Action Films');
insert into options (id, option) values (68, 'Documentaries');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (17, 4, 17);
-- correct answer for  "Celebrities" question 2
insert into question_answer (id, question_id, answer_id) values (17, 17, 65);
-- other possible options for  "Celebrities" question 2
insert into question_option (id, question_id, option_id) values (50, 17, 66);
insert into question_option (id, question_id, option_id) values (51, 17, 67);
insert into question_option (id, question_id, option_id) values (52, 17, 68);


------
insert into questions (id, question) values (18, 'What was the cause of Marilyn Monroes suicide?');
-- // Options for "Celebrities" question 3
insert into options (id, option) values (69, 'Drug Overdose');
insert into options (id, option) values (70, 'Knife Attack');
insert into options (id, option) values (71, 'House Fire');
insert into options (id, option) values (72, 'Gunshot');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (18, 4, 18);
-- correct answer for  "Celebrities" question 3
insert into question_answer (id, question_id, answer_id) values (18, 18, 69);
-- other possible options for  "Celebrities" question 3
insert into question_option (id, question_id, option_id) values (53, 18, 70);
insert into question_option (id, question_id, option_id) values (54, 18, 71);
insert into question_option (id, question_id, option_id) values (55, 18, 72);

------
insert into questions (id, question) values (19, 'Gwyneth Paltrow has a daughter named...?');
-- // Options for "Celebrities" question 4
insert into options (id, option) values (73, 'Apple');
insert into options (id, option) values (74, 'Lily');
insert into options (id, option) values (75, 'French');
insert into options (id, option) values (76, 'Dakota');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (19, 4, 19);
-- correct answer for  "Celebrities" question 4
insert into question_answer (id, question_id, answer_id) values (19, 19, 73);
-- other possible options for  "Celebrities" question 4
insert into question_option (id, question_id, option_id) values (56, 19, 74);
insert into question_option (id, question_id, option_id) values (57, 19, 75);
insert into question_option (id, question_id, option_id) values (58, 19, 76);

------
insert into questions (id, question) values (20, 'By which name is Ramon Estevez better known as?');
-- // Options for "Celebrities" question 5
insert into options (id, option) values (77, 'Martin Sheen');
insert into options (id, option) values (78, 'Charlie Sheen');
insert into options (id, option) values (79, 'Ramon Sheen');
insert into options (id, option) values (80, 'Emilio Estevez');
-- What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (20, 4, 20);
-- correct answer for  "Celebrities" question 5
insert into question_answer (id, question_id, answer_id) values (20, 20, 77);
-- other possible options for  "Celebrities" question 5
insert into question_option (id, question_id, option_id) values (59, 20, 78);
insert into question_option (id, question_id, option_id) values (60, 20, 79);
insert into question_option (id, question_id, option_id) values (61, 20, 80);

-------
-- Questions for Entertainment Film
insert into questions (id, question) values (21, 'What breed of dog was Marley in the film ''Marley & Me'' (2008)?');
-- // Options for "Entertainment Film" question 1
insert into options (id, option) values (81, 'Labrador Retrieve');
insert into options (id, option) values (82, 'Golden Retriever');
insert into options (id, option) values (83, 'Dalmatian');
insert into options (id, option) values (84, 'Shiba Inu');
-- - What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (21, 5, 21);
-- correct answer for  ""Entertainment Film"" question 1
insert into question_answer (id, question_id, answer_id) values (21, 21, 81);
-- other possible options for  ""Entertainment Film"" question 1
insert into question_option (id, question_id, option_id) values (62, 21, 82);
insert into question_option (id, question_id, option_id) values (63, 21, 83);
insert into question_option (id, question_id, option_id) values (64, 21, 84);


------
insert into questions (id, question) values (22, 'Which of the following was not one of ''The Magnificent Seven''?');
-- // Options for "Entertainment Film" question 2
insert into options (id, option) values (85, 'Clint Eastwood');
insert into options (id, option) values (86, 'Steve McQueen');
insert into options (id, option) values (87, 'Charles Bronson');
insert into options (id, option) values (88, 'Robert Vaughn');
-- - What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (22, 5, 22);
-- correct answer for  ""Entertainment Film"" question 2
insert into question_answer (id, question_id, answer_id) values (22, 22, 85);
-- other possible options for  ""Entertainment Film"" question 2
insert into question_option (id, question_id, option_id) values (65, 22, 86);
insert into question_option (id, question_id, option_id) values (66, 22, 87);
insert into question_option (id, question_id, option_id) values (67, 22, 88);


------
insert into questions (id, question) values (23, 'Daniel Radcliffe became a global star in the film industry due to his performance in which film franchise?');
-- // Options for "Entertainment Film" question 3
insert into options (id, option) values (89, 'Harry Potter');
insert into options (id, option) values (90, 'Ted');
insert into options (id, option) values (91, 'Spy Kids');
insert into options (id, option) values (92, 'Pirates of the Caribbean');
-- - What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (23, 5, 23);
-- correct answer for  ""Entertainment Film"" question 3
insert into question_answer (id, question_id, answer_id) values (23, 23, 89);
-- other possible options for  ""Entertainment Film"" question 3
insert into question_option (id, question_id, option_id) values (68, 23, 90);
insert into question_option (id, question_id, option_id) values (69, 23, 91);
insert into question_option (id, question_id, option_id) values (70, 23, 92);


------
insert into questions (id, question) values (24, 'In ''Jurassic World'', what is the name of the dinosaur that is a genetic hybrid?');
-- // Options for "Entertainment Film" question 4
insert into options (id, option) values (93, 'Indominus Rex');
insert into options (id, option) values (94, 'Mosasaurus');
insert into options (id, option) values (95, 'Pteranodon');
insert into options (id, option) values (96, 'Tyrannosaurus Rex');
-- - What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (24, 5, 24);
-- correct answer for  ""Entertainment Film"" question 4
insert into question_answer (id, question_id, answer_id) values (24, 24, 93);
-- other possible options for  ""Entertainment Film"" question 4
insert into question_option (id, question_id, option_id) values (71, 24, 94);
insert into question_option (id, question_id, option_id) values (72, 24, 95);
insert into question_option (id, question_id, option_id) values (73, 24, 96);


----
insert into questions (id, question) values (25, 'In the 2012 film, ''The Lorax'', who is the antagonist?');
-- // Options for "Entertainment Film" question 5
insert into options (id, option) values (97, 'Aloysius OHare');
insert into options (id, option) values (98, 'Ted Wiggins');
insert into options (id, option) values (99, 'The Once-Ler');
insert into options (id, option) values (100, 'Grammy Norma');
-- - What quiz does this question belong to?
insert into quiz_question (id, quiz_id, question_id) values (25, 5, 25);
-- correct answer for  ""Entertainment Film"" question 5
insert into question_answer (id, question_id, answer_id) values (25, 25, 97);
-- other possible options for  ""Entertainment Film"" question 5
insert into question_option (id, question_id, option_id) values (74, 25, 98);
insert into question_option (id, question_id, option_id) values (75, 25, 99);
insert into question_option (id, question_id, option_id) values (76, 25, 100);

