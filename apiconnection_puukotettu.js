/* Yleisesti käytettävät osat */
/* Tavoitteena oppia: 
1. Hakemaan tietoa APIn kautta
2. Rakentamaan sivua javascript-koodista.
3. Lisäämään APIsta haettu tieto osaksi verkkosivua
*/ 
/* Funktion nimi ja mahdolliset parametrit oman APIn mukaan */

function getData() {
	/* Palvelinpyynnön luonti ja lähetys */
	var xmlhttp = new XMLHttpRequest();
	let url = "https://statsapi.web.nhl.com/api/v1/teams"
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
	/* Palvelinpyynnön vastaanotto */
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			/* Puretaan vastaus olioksi - tarkasta XML-käsittely erikseen. Alla JSON esimerkki */
			const jsonDoc = JSON.parse(xmlhttp.responseText);
			console.log(jsonDoc.teams.filter((team) =>team.locationName==='New York'));
			/* luodaan pääelementti, johon muut elementit liitetään myöhemmin. Tämä palautetaan koodista sivulle */
			let writingArea = document.createElement('div');
			/* Käydään läpi kaikki APIsta palautuneet tiedot - HUOM! FORilla pitää käydä läpi se rakenne, josta halutaan hakea tietoa. NHL-rajapinnassa koko dokumentin pituus on 0, mutta Teams-kohdassa 32. Vastaava käsittely rosterille. */
			for (i = 0; i < jsonDoc.teams.length; i++) {
				let row = document.createElement('div');
				let team = jsonDoc.teams[i].name;
				let venue = jsonDoc.teams[i].venue.name;
				row.innerHTML = team + " pelaa " + venue + "-hallissa";
				writingArea.appendChild(row);		
			}
			/* Kun kaikki tiedot on käyty läpi, palautetaan kaikki tiedot HTML-sivun rakenteeseen haluttuun paikkaan */
			document.getElementById("writeHere").appendChild(writingArea);
			
		}
	}
}

getData();