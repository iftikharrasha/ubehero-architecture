import moment from "moment";

const date = new Date();
const todayFull = moment(date);
// var today = moment(date).format('YYYY-MM-DD');

export const epg = [
{
	"id": "6f3caa7f-5b11-4edb-998e-80d4baa03373",
	"description": "Bounty hunter Boba Fett & mercenary Fennec Shand navigate the underworld when they return to Tatooine to claim Jabba the Hutt's old turf.",
	"title": "Pubg Battle Undergrounds",
	"isYesterday": true,
    "since": `${todayFull.clone().subtract(2, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    "till": `${todayFull.clone().add(2, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    // "since": `${today}T00:55:00`,
    // "till": `${today}T04:55:00`,
	"channelUuid": "16fdfefe-e466-4090-bc1a-57c43937f826",
	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/sjx6zjQI2dLGtEL0HGWsnq6UyLU.jpg",
	"country": "Ghana",
	"Year": "2021–",
	"Rated": "TV-14",
	"Released": "29 Dec 2021",
	"Runtime": "N/A",
	"Genre": "Action, Adventure, Sci-Fi",
	"Director": "N/A",
	"Writer": "Jon Favreau",
	"Actors": "Temuera Morrison, Ming-Na Wen, Matt Berry",
	"Language": "English",
	"Country": "United States",
	"Awards": "N/A",
	"Metascore": "N/A",
	"imdbRating": "8.0",
	"imdbVotes": "20,147",
	"imdbID": "tt13668894",
	"Type": "series",
	"totalSeasons": "1",
	"Response": "True",
	"Ratings": [{
		"Source": "Internet Movie Database",
		"Value": "8.0/10"
	}],
	"rating": 3
}, 
// {
// 	"id": "f8fa7e21-6a8a-4ccc-8859-6f61a31f2f55",
// 	"description": "The series will follow Carrie, Miranda and Charlotte as they navigate the journey from the complicated reality of life and friendship in their 30s to the even more complicated reality of life and friendship in their 50s.",
// 	"title": "And Just Like That...",
// 	""since"": "2022-07-24T00:55:00",
// 	""till"": "2022-07-24T02:35:00",
// 	"channelUuid": "16fdfefe-e466-4090-bc1a-57c43937f826",
// 	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/1CqkiWeuwlaMswG02q3mBmraiDM.jpg",
// 	"country": "Mozambique",
// 	"Year": "2021–",
// 	"Rated": "TV-MA",
// 	"Released": "09 Dec 2021",
// 	"Runtime": "N/A",
// 	"Genre": "Comedy, Drama, Romance",
// 	"Director": "N/A",
// 	"Writer": "Michael Patrick King, Darren Star",
// 	"Actors": "Sarah Jessica Parker, Cynthia Nixon, Kristin Davis",
// 	"Language": "English",
// 	"Country": "United States",
// 	"Awards": "N/A",
// 	"Metascore": "N/A",
// 	"imdbRating": "5.4",
// 	"imdbVotes": "18,366",
// 	"imdbID": "tt13819960",
// 	"Type": "series",
// 	"totalSeasons": "1",
// 	"Response": "True",
// 	"Ratings": [{
// 		"Source": "Internet Movie Database",
// 		"Value": "5.4/10"
// 	}],
// 	"rating": 1
// }, 
{
	"id": "4283023a-8bc8-453b-ba29-2af931c37e4d",
	"description": "A hedonistic jingle writer's free-wheeling life comes to an abrupt halt when his brother and 10-year-old nephew move into his beach-front house.",
	"title": "Freefire ultimate destination",
	"isYesterday": true,
    "since": `${todayFull.add(0.5, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    "till": `${todayFull.add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    // "since": `${today}T04:10:00`,
    // "till": `${today}T08:35:00`,
	"channelUuid": "96aaf72c-b5ed-4ce4-937d-1912e4f8bf0d",
	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/lW3r6Fb7dwZ0bpGwjYHMVkgSVRt.jpg",
	"country": "Colombia",
	"Year": "2003–2015",
	"Rated": "TV-14",
	"Released": "22 Sep 2003",
	"Runtime": "22 min",
	"Genre": "Comedy, Romance",
	"Director": "N/A",
	"Writer": "Lee Aronsohn, Chuck Lorre",
	"Actors": "Jon Cryer, Ashton Kutcher, Angus T. Jones",
	"Language": "English",
	"Country": "United States",
	"Awards": "Won 9 Primetime Emmys. 30 wins & 72 nominations total",
	"Metascore": "N/A",
	"imdbRating": "7.0",
	"imdbVotes": "253,658",
	"imdbID": "tt0369179",
	"Type": "series",
	"totalSeasons": "12",
	"Response": "True",
	"Ratings": [{
		"Source": "Internet Movie Database",
		"Value": "7.0/10"
	}],
	"rating": 5
}, 
// {
// 	"id": "7d7deff1-5c78-41ab-89d5-58dd286db55a",
// 	"description": "A father recounts to his children - through a series of flashbacks - the journey he and his four best friends took leading up to him meeting their mother.",
// 	"title": "How I Met Your Mother",
// 	""since"": "2022-07-24T01:35:00",
// 	""till"": "2022-07-24T03:45:00",
// 	"channelUuid": "96aaf72c-b5ed-4ce4-937d-1912e4f8bf0d",
// 	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/gvEisYtZ0iBMjnO3zqFU2oM26oM.jpg",
// 	"country": "Brazil",
// 	"Year": "2005–2014",
// 	"Rated": "TV-14",
// 	"Released": "19 Sep 2005",
// 	"Runtime": "22 min",
// 	"Genre": "Comedy, Romance",
// 	"Director": "N/A",
// 	"Writer": "Carter Bays, Craig Thomas",
// 	"Actors": "Josh Radnor, Jason Segel, Cobie Smulders",
// 	"Language": "English, Persian, Chinese",
// 	"Country": "United States",
// 	"Awards": "Won 10 Primetime Emmys. 26 wins & 95 nominations total",
// 	"Metascore": "N/A",
// 	"imdbRating": "8.3",
// 	"imdbVotes": "647,227",
// 	"imdbID": "tt0460649",
// 	"Type": "series",
// 	"totalSeasons": "9",
// 	"Response": "True",
// 	"Ratings": [{
// 		"Source": "Internet Movie Database",
// 		"Value": "8.3/10"
// 	}],
// 	"rating": 2
// },  
{
	"id": "e3441fd3-688b-42fa-975e-3a7d84a8253c",
	"description": "Listen to highlights and extended interviews in the \"Ears Edition\" of The Daily Show with Trevor Noah. From Comedy Central's Podcast Network.",
	"title": "The Daily Fifa Fight",
	"isYesterday": true,
    "since": `${todayFull.clone().subtract(2, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    "till": `${todayFull.clone().add(2, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    // "since": `${today}T02:20:00`,
    // "till": `${today}T13:25:00`,
	"channelUuid": "06d3366b-9ec2-46e8-a741-df3ee1abeed7",
	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/uyilhJ7MBLjiaQXboaEwe44Z0jA.jpg",
	"country": "Jamaica",
	"Year": "2018–",
	"Rated": "N/A",
	"Released": "20 Feb 2018",
	"Runtime": "N/A",
	"Genre": "Comedy",
	"Director": "N/A",
	"Writer": "N/A",
	"Actors": "Trevor Noah, Ronny Chieng, Michael Kosta",
	"Language": "English",
	"Country": "United States",
	"Awards": "N/A",
	"Metascore": "N/A",
	"imdbRating": "N/A",
	"imdbVotes": "N/A",
	"imdbID": "tt13916212",
	"Type": "series",
	"totalSeasons": "N/A",
	"Response": "True",
	"Ratings": [],
	"rating": 4
}, 
// {
// 	"id": "ff4df118-25e7-4c98-9272-81b198436fd9",
// 	"description": "A comedy revolving around a group of teenage friends, their mishaps, and their coming of age, set in 1970s Wisconsin.",
// 	"title": "That '70s Show",
// 	""since"": "2022-07-24T00:25:00",
// 	""till"": "2022-07-24T01:30:00",
// 	"channelUuid": "06d3366b-9ec2-46e8-a741-df3ee1abeed7",
// 	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/3zRUiH8erHIgNUBTj05JT00HwsS.jpg",
// 	"country": "Pitcairn Islands",
// 	"Year": "1998–2006",
// 	"Rated": "TV-14",
// 	"Released": "23 Aug 1998",
// 	"Runtime": "22 min",
// 	"Genre": "Comedy, Drama, Romance",
// 	"Director": "N/A",
// 	"Writer": "Mark Brazill, Bonnie Turner, Terry Turner",
// 	"Actors": "Topher Grace, Laura Prepon, Mila Kunis",
// 	"Language": "English",
// 	"Country": "United States",
// 	"Awards": "Won 1 Primetime Emmy. 15 wins & 77 nominations total",
// 	"Metascore": "N/A",
// 	"imdbRating": "8.0",
// 	"imdbVotes": "163,020",
// 	"imdbID": "tt0165598",
// 	"Type": "series",
// 	"totalSeasons": "8",
// 	"Response": "True",
// 	"Ratings": [{
// 		"Source": "Internet Movie Database",
// 		"Value": "8.0/10"
// 	}],
// 	"rating": 4
// }, 
{
	"id": "c6f9ddf6-aa54-418d-ac6e-d4eef30b3f7c",
	"description": "During a perilous 24-hour mission on the moon, space explorers try to retrieve samples from an abandoned research facility steeped in classified secrets.",
	"title": "Call of Duty",
	"isYesterday": true,
    "since": `${todayFull.clone().subtract(4, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    "till": `${todayFull.clone().subtract(1, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    // "since": `${today}T00:45:00`,
    // "till": `${today}T11:00:00`,
	"channelUuid": "b51689be-8eb4-4481-b208-6bbcb7fb47c2",
	"image": "https://res.cloudinary.com/duoalyur6/image/upload/v1695205125/MOSHED-2023-9-20-16-14-6_f5kjsi.gif",
	"country": "Belize",
	"Year": "2021–",
	"Rated": "TV-MA",
	"Released": "24 Dec 2021",
	"Runtime": "N/A",
	"Genre": "Adventure, Drama, Mystery",
	"Director": "N/A",
	"Writer": "N/A",
	"Actors": "Bae Doona, Gong Yoo, Joon Lee",
	"Language": "Korean",
	"Country": "South Korea",
	"Awards": "N/A",
	"Metascore": "N/A",
	"imdbRating": "6.9",
	"imdbVotes": "13,008",
	"imdbID": "tt11570202",
	"Type": "series",
	"totalSeasons": "1",
	"Response": "True",
	"Ratings": [{
		"Source": "Internet Movie Database",
		"Value": "6.9/10"
	}],
	"rating": 4
}, 
// {
// 	"id": "3d31dcb8-f199-4902-974e-28001124bc52",
// 	"description": "The misadventures of a talking sea sponge who works at a fast food restaurant, attends a boating school, and lives in an underwater pineapple.",
// 	"title": "SpongeBob SquarePants",
// 	""since"": "2022-07-24T01:00:00",
// 	""till"": "2022-07-24T02:05:00",
// 	"channelUuid": "b51689be-8eb4-4481-b208-6bbcb7fb47c2",
// 	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/maFEWU41jdUOzDfRVkojq7fluIm.jpg",
// 	"country": "Gibraltar",
// 	"Year": "1999–",
// 	"Rated": "TV-Y",
// 	"Released": "01 May 1999",
// 	"Runtime": "23 min",
// 	"Genre": "Animation, Comedy, Family",
// 	"Director": "N/A",
// 	"Writer": "Stephen Hillenburg, Tim Hill, Nick Jennings",
// 	"Actors": "Tom Kenny, Bill Fagerbakke, Rodger Bumpass",
// 	"Language": "English, Irish Gaelic, Korean",
// 	"Country": "United States",
// 	"Awards": "Nominated for 10 Primetime Emmys. 55 wins & 63 nominations total",
// 	"Metascore": "N/A",
// 	"imdbRating": "8.2",
// 	"imdbVotes": "91,921",
// 	"imdbID": "tt0206512",
// 	"Type": "series",
// 	"totalSeasons": "13",
// 	"Response": "True",
// 	"Ratings": [{
// 		"Source": "Internet Movie Database",
// 		"Value": "8.2/10"
// 	}],
// 	"rating": 1
// }, 
{
	"id": "079d6658-40a7-42ae-97b8-d69ceb3efe85",
	"description": "Follow Timmy Turner's cousin, Vivian \"Viv\" Turner, and her new stepbrother, Roy Ragland, as they navigate life in Dimmsdale with the help of their fairy godparents, Wanda and Cosmo.",
	"title": "Fairly odd games",
	"isYesterday": true,
    "since": `${todayFull.clone().subtract(6, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    "till": `${todayFull.clone().subtract(3.5, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    // "since": `${today}T23:10:00`,
    // "till": `${today}T02:15:00`,
	"channelUuid": "b95dc0e8-93d6-473e-a0ce-839d988b1dcf",
	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/jlruzecsif3tkCSoHlUaPR01O7U.jpg",
	"country": "Armenia",
	"Year": "2022–",
	"Rated": "TV-Y7",
	"Released": "N/A",
	"Runtime": "N/A",
	"Genre": "Adventure, Comedy, Family",
	"Director": "N/A",
	"Writer": "N/A",
	"Actors": "Audrey Grace Marshall, Ryan-James Hatanaka, Daran Norris",
	"Language": "English",
	"Country": "United States",
	"Awards": "N/A",
	"Metascore": "N/A",
	"imdbRating": "N/A",
	"imdbVotes": "N/A",
	"imdbID": "tt15057532",
	"Type": "series",
	"totalSeasons": "1",
	"Response": "True",
	"Ratings": [],
	"rating": 2
}, 
// {
// 	"id": "306186a3-36d4-4fd3-a925-9044409e3ea6",
// 	"description": "An antisocial maverick doctor who specializes in diagnostic medicine does whatever it takes to solve puzzling cases that come his way using his crack team of doctors and his wits.",
// 	"title": "House",
// 	""since"": "2022-07-24T02:15:00",
// 	""till"": "2022-07-24T04:40:00",
// 	"channelUuid": "b95dc0e8-93d6-473e-a0ce-839d988b1dcf",
// 	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/hiK4qc0tZijQ9KNUnBIS1k4tdMJ.jpg",
// 	"country": "North Vietnam",
// 	"Year": "2004–2012",
// 	"Rated": "TV-14",
// 	"Released": "16 Nov 2004",
// 	"Runtime": "44 min",
// 	"Genre": "Drama, Mystery",
// 	"Director": "N/A",
// 	"Writer": "David Shore",
// 	"Actors": "Hugh Laurie, Omar Epps, Robert Sean Leonard",
// 	"Language": "English",
// 	"Country": "United States",
// 	"Awards": "Won 5 Primetime Emmys. 57 wins & 140 nominations total",
// 	"Metascore": "N/A",
// 	"imdbRating": "8.7",
// 	"imdbVotes": "439,759",
// 	"imdbID": "tt0412142",
// 	"Type": "series",
// 	"totalSeasons": "8",
// 	"Response": "True",
// 	"Ratings": [{
// 		"Source": "Internet Movie Database",
// 		"Value": "8.7/10"
// 	}],
// 	"rating": 2
// }, 
{
	"id": "d5d67ed1-2174-4b25-ace8-d609b1ecca92",
	"description": "A doctor (Shepard) gets caught up in a war between two aliens (Edwards, Forster).",
	"title": "Need for speed",
	"isYesterday": true,
    "since": `${todayFull.clone().subtract(1, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    "till": `${todayFull.clone().add(2, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    // "since": `${today}T08:25:00`,
    // "till": `${today}T16:25:00`,
	"channelUuid": "359563a3-3bbb-40f7-8a55-bec3b11180c4",
	"image": "https://www.themoviedb.org/t/p/w500_and_h282_face/ctxm191q5o3axFzQsvNPlbKoSYv.jpg",
	"country": "Moldova",
	"Year": "1990",
	"Rated": "R",
	"Released": "08 Feb 1991",
	"Runtime": "100 min",
	"Genre": "Action, Romance, Sci-Fi",
	"Director": "Kevin Tenney",
	"Writer": "Kevin Tenney",
	"Actors": "Robert Forster, Lance Edwards, Hilary Shepard",
	"Language": "English",
	"Country": "United States",
	"Awards": "N/A",
	"Metascore": "N/A",
	"imdbRating": "5.3",
	"imdbVotes": "567",
	"imdbID": "tt0100343",
	"Type": "movie",
	"DVD": "N/A",
	"BoxOffice": "N/A",
	"Production": "N/A",
	"Website": "N/A",
	"Response": "True",
	"Ratings": [{
		"Source": "Internet Movie Database",
		"Value": "5.3/10"
	}],
	"rating": 3
}, 
// {
// 	"id": "bdbc397f-22da-40c3-903c-ea4262e4f05e",
// 	"description": "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
// 	"title": "Friends",
// 	""since"": "2022-07-24T00:25:00",
// 	""till"": "2022-07-24T01:25:00",
// 	"channelUuid": "359563a3-3bbb-40f7-8a55-bec3b11180c4",
// 	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/l0qVZIpXtIo7km9u5Yqh0nKPOr5.jpg",
// 	"country": "Sierra Leone",
// 	"Year": "1994–2004",
// 	"Rated": "TV-PG",
// 	"Released": "22 Sep 1994",
// 	"Runtime": "22 min",
// 	"Genre": "Comedy, Romance",
// 	"Director": "N/A",
// 	"Writer": "David Crane, Marta Kauffman",
// 	"Actors": "Jennifer Aniston, Courteney Cox, Lisa Kudrow",
// 	"Language": "English, Spanish, Italian, French, Dutch, Hebrew",
// 	"Country": "United States",
// 	"Awards": "Won 6 Primetime Emmys. 77 wins & 220 nominations total",
// 	"Metascore": "N/A",
// 	"imdbRating": "8.8",
// 	"imdbVotes": "928,567",
// 	"imdbID": "tt0108778",
// 	"Type": "series",
// 	"totalSeasons": "10",
// 	"Response": "True",
// 	"Ratings": [{
// 		"Source": "Internet Movie Database",
// 		"Value": "8.8/10"
// 	}],
// 	"rating": 4
// }, 
{
	"id": "ca3e3de0-28d6-46cc-8121-5f63ebe143e1",
	"description": "Comedian Jimmy Fallon hosts a late-night talk show.",
	"title": "Late Night with Jimmy Fallon",
	"isYesterday": true,
    "since": `${todayFull.clone().subtract(10, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    "till": `${todayFull.clone().subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    // "since": `${today}T23:50:00`,
    // "till": `${today}T00:45:00`,
	"channelUuid": "21dda491-f640-4db5-9172-d35eedd06ea5",
	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/uu5FuSKleCLh0Kq2pmGzlPH3aeS.jpg",
	"country": "Sweden",
	"Year": "2009–2014",
	"Rated": "TV-14",
	"Released": "02 Mar 2009",
	"Runtime": "60 min",
	"Genre": "Comedy, Music, Talk-Show",
	"Director": "N/A",
	"Writer": "N/A",
	"Actors": "Jimmy Fallon, The Roots, Steve Higgins",
	"Language": "English",
	"Country": "United States",
	"Awards": "Won 2 Primetime Emmys. 5 wins & 17 nominations total",
	"Metascore": "N/A",
	"imdbRating": "6.8",
	"imdbVotes": "13,098",
	"imdbID": "tt1231460",
	"Type": "series",
	"totalSeasons": "5",
	"Response": "True",
	"Ratings": [{
		"Source": "Internet Movie Database",
		"Value": "6.8/10"
	}],
	"rating": 1
}, 
// {
// 	"id": "1f1135dd-35b2-445b-b4be-5a031ca540f2",
// 	"description": "Bounty hunter Boba Fett & mercenary Fennec Shand navigate the underworld when they return to Tatooine to claim Jabba the Hutt's old turf.",
// 	"title": "The Book of Boba Fett",
// 	""since"": "2022-07-24T00:45:00",
// 	""till"": "2022-07-24T01:45:00",
// 	"channelUuid": "21dda491-f640-4db5-9172-d35eedd06ea5",
// 	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/sjx6zjQI2dLGtEL0HGWsnq6UyLU.jpg",
// 	"country": "Gambia",
// 	"Year": "2021–",
// 	"Rated": "TV-14",
// 	"Released": "29 Dec 2021",
// 	"Runtime": "N/A",
// 	"Genre": "Action, Adventure, Sci-Fi",
// 	"Director": "N/A",
// 	"Writer": "Jon Favreau",
// 	"Actors": "Temuera Morrison, Ming-Na Wen, Matt Berry",
// 	"Language": "English",
// 	"Country": "United States",
// 	"Awards": "N/A",
// 	"Metascore": "N/A",
// 	"imdbRating": "8.0",
// 	"imdbVotes": "20,147",
// 	"imdbID": "tt13668894",
// 	"Type": "series",
// 	"totalSeasons": "1",
// 	"Response": "True",
// 	"Ratings": [{
// 		"Source": "Internet Movie Database",
// 		"Value": "8.0/10"
// 	}],
// 	"rating": 2
// }, 
{
	"id": "c02b08bd-9580-404b-865f-801c1565abe1",
	"description": "The misadventures of a talking sea sponge who works at a fast food restaurant, attends a boating school, and lives in an underwater pineapple.",
	"title": "SpongeBob SquarePants",
    "since": `${todayFull.clone().subtract(2, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    "till": `${todayFull.clone().add(4, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    // "since": `${today}T00:00:00`,
    // "till": `${today}T04:00:00`,
	"channelUuid": "d75873f4-4f2c-46f6-b6d6-65cfa62b8cf7",
	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/maFEWU41jdUOzDfRVkojq7fluIm.jpg",
	"country": "Greenland",
	"Year": "1999–",
	"Rated": "TV-Y",
	"Released": "01 May 1999",
	"Runtime": "23 min",
	"Genre": "Animation, Comedy, Family",
	"Director": "N/A",
	"Writer": "Stephen Hillenburg, Tim Hill, Nick Jennings",
	"Actors": "Tom Kenny, Bill Fagerbakke, Rodger Bumpass",
	"Language": "English, Irish Gaelic, Korean",
	"Country": "United States",
	"Awards": "Nominated for 10 Primetime Emmys. 55 wins & 63 nominations total",
	"Metascore": "N/A",
	"imdbRating": "8.2",
	"imdbVotes": "91,921",
	"imdbID": "tt0206512",
	"Type": "series",
	"totalSeasons": "13",
	"Response": "True",
	"Ratings": [{
		"Source": "Internet Movie Database",
		"Value": "8.2/10"
	}],
	"rating": 4
}, 
// {
// 	"id": "f398d8f2-9850-468c-9622-a9f66e14106c",
// 	"description": "After being struck by lightning, Barry Allen wakes up from his coma to discover he's been given the power of super speed, becoming the Flash, fighting crime in Central City.",
// 	"title": "The Flash",
// 	""since"": "2022-07-24T01:00:00",
// 	""till"": "2022-07-24T01:45:00",
// 	"channelUuid": "d75873f4-4f2c-46f6-b6d6-65cfa62b8cf7",
// 	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/akuD37ySZGUkXR7LNb1oOHCboy8.jpg",
// 	"country": "Honduras",
// 	"Year": "2014–",
// 	"Rated": "TV-PG",
// 	"Released": "07 Oct 2014",
// 	"Runtime": "43 min",
// 	"Genre": "Action, Adventure, Drama",
// 	"Director": "N/A",
// 	"Writer": "Greg Berlanti, Geoff Johns, Andrew Kreisberg",
// 	"Actors": "Grant Gustin, Candice Patton, Danielle Panabaker",
// 	"Language": "English",
// 	"Country": "United States",
// 	"Awards": "Nominated for 1 Primetime Emmy. 29 wins & 90 nominations total",
// 	"Metascore": "N/A",
// 	"imdbRating": "7.6",
// 	"imdbVotes": "331,912",
// 	"imdbID": "tt3107288",
// 	"Type": "series",
// 	"totalSeasons": "8",
// 	"Response": "True",
// 	"Ratings": [{
// 		"Source": "Internet Movie Database",
// 		"Value": "7.6/10"
// 	}],
// 	"rating": 2
// }, 
{
	"id": "574a60de-4e64-49f0-aa6c-63a437d60b17",
	"description": "Shaun Murphy, a young surgeon with autism and Savant syndrome, is recruited into the surgical unit of a prestigious hospital.",
	"title": "Warzone Call of Duty",
	"isYesterday": true,
    "since": `${todayFull.clone().subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    "till": `${todayFull.clone().subtract(1, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    // "since": `${today}T01:00:00`,
    // "till": `${today}T05:20:00`,
	"channelUuid": "a7238d3d-f1e6-4934-a663-37c1902920cd",
	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/6Ys6koNajP5ld9EIMfOSQrRquki.jpg",
	"country": "Puerto Rico",
	"Year": "2017–",
	"Rated": "TV-14",
	"Released": "25 Sep 2017",
	"Runtime": "41 min",
	"Genre": "Drama",
	"Director": "N/A",
	"Writer": "David Shore",
	"Actors": "Freddie Highmore, Hill Harper, Richard Schiff",
	"Language": "English",
	"Country": "United States",
	"Awards": "4 wins & 20 nominations",
	"Metascore": "N/A",
	"imdbRating": "8.1",
	"imdbVotes": "84,759",
	"imdbID": "tt6470478",
	"Type": "series",
	"totalSeasons": "5",
	"Response": "True",
	"Ratings": [{
		"Source": "Internet Movie Database",
		"Value": "8.1/10"
	}],
	"rating": 3
}, 
// {
// 	"id": "aadc49f9-60fd-4de7-898d-5255a154db12",
// 	"description": "A doctor (Shepard) gets caught up in a war between two aliens (Edwards, Forster).",
// 	"title": "Peacemaker",
// 	""since"": "2022-07-24T01:20:00",
// 	""till"": "2022-07-24T01:45:00",
// 	"channelUuid": "a7238d3d-f1e6-4934-a663-37c1902920cd",
// 	"image": "https://www.themoviedb.org/t/p/w500_and_h282_face/ctxm191q5o3axFzQsvNPlbKoSYv.jpg",
// 	"country": "Costa Rica",
// 	"Year": "1990",
// 	"Rated": "R",
// 	"Released": "08 Feb 1991",
// 	"Runtime": "100 min",
// 	"Genre": "Action, Romance, Sci-Fi",
// 	"Director": "Kevin Tenney",
// 	"Writer": "Kevin Tenney",
// 	"Actors": "Robert Forster, Lance Edwards, Hilary Shepard",
// 	"Language": "English",
// 	"Country": "United States",
// 	"Awards": "N/A",
// 	"Metascore": "N/A",
// 	"imdbRating": "5.3",
// 	"imdbVotes": "567",
// 	"imdbID": "tt0100343",
// 	"Type": "movie",
// 	"DVD": "N/A",
// 	"BoxOffice": "N/A",
// 	"Production": "N/A",
// 	"Website": "N/A",
// 	"Response": "True",
// 	"Ratings": [{
// 		"Source": "Internet Movie Database",
// 		"Value": "5.3/10"
// 	}],
// 	"rating": 3
// }, 
{
	"id": "292c0ffe-5790-4286-812b-342854f4f4f6",
	"description": "A comedy revolving around a group of teenage friends, their mishaps, and their coming of age, set in 1970s Wisconsin.",
	"title": "NFS '70s Show",
	"isYesterday": true,
    "since": `${todayFull.clone().subtract(1, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    "till": `${todayFull.clone().add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss')}`,
    // "since": `${today}T03:10:00`,
    // "till": `${today}T07:15:00`,
	"channelUuid": "da5fc532-fa14-481b-91c7-0c8bc4ee91a3",
	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/3zRUiH8erHIgNUBTj05JT00HwsS.jpg",
	"country": "Armenia",
	"Year": "1998–2006",
	"Rated": "TV-14",
	"Released": "23 Aug 1998",
	"Runtime": "22 min",
	"Genre": "Comedy, Drama, Romance",
	"Director": "N/A",
	"Writer": "Mark Brazill, Bonnie Turner, Terry Turner",
	"Actors": "Topher Grace, Laura Prepon, Mila Kunis",
	"Language": "English",
	"Country": "United States",
	"Awards": "Won 1 Primetime Emmy. 15 wins & 77 nominations total",
	"Metascore": "N/A",
	"imdbRating": "8.0",
	"imdbVotes": "163,020",
	"imdbID": "tt0165598",
	"Type": "series",
	"totalSeasons": "8",
	"Response": "True",
	"Ratings": [{
		"Source": "Internet Movie Database",
		"Value": "8.0/10"
	}],
	"rating": 4
}, 
// {
// 	"id": "0bf6bc40-621f-46c0-b896-cb68858674cd",
// 	"description": "A comedy revolving around a group of teenage friends, their mishaps, and their coming of age, set in 1970s Wisconsin.",
// 	"title": "That '70s Show",
// 	""since"": "2022-07-24T02:15:00",
// 	""till"": "2022-07-24T04:40:00",
// 	"channelUuid": "da5fc532-fa14-481b-91c7-0c8bc4ee91a3",
// 	"image": "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/3zRUiH8erHIgNUBTj05JT00HwsS.jpg",
// 	"country": "North Vietnam",
// 	"Year": "1998–2006",
// 	"Rated": "TV-14",
// 	"Released": "23 Aug 1998",
// 	"Runtime": "22 min",
// 	"Genre": "Comedy, Drama, Romance",
// 	"Director": "N/A",
// 	"Writer": "Mark Brazill, Bonnie Turner, Terry Turner",
// 	"Actors": "Topher Grace, Laura Prepon, Mila Kunis",
// 	"Language": "English",
// 	"Country": "United States",
// 	"Awards": "Won 1 Primetime Emmy. 15 wins & 77 nominations total",
// 	"Metascore": "N/A",
// 	"imdbRating": "8.0",
// 	"imdbVotes": "163,020",
// 	"imdbID": "tt0165598",
// 	"Type": "series",
// 	"totalSeasons": "8",
// 	"Response": "True",
// 	"Ratings": [{
// 		"Source": "Internet Movie Database",
// 		"Value": "8.0/10"
// 	}],
// 	"rating": 1
// }, 
]