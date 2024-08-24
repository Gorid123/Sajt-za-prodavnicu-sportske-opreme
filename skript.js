const Otvori = indeks => { window.open('info.html?indeks=' + indeks, '_self') } //indeks se salje preko url adrese i otvara se u istom prozoru (_self)

const PodesiLinkove = (pocetak = 0) => { //start dobija vrednost 0 ako je undefined tj ako argument nije dat
    const predmeti = document.body.querySelectorAll('.predmet') //nalazi sve elemente klase predmet
    for (let i = 0; i < predmeti.length; i++)
        predmeti[i].onclick = () => { Otvori(i + pocetak) }
}

const PodesiSlajder = predmeti => {
    let interval, indeks = 0, niz
    const roditelj = document.getElementById('slajder-tacke')
    const slika = document.getElementById('slajder-slika')
    const tekst_element = document.getElementById('slajder-tekst')
    const PodesiSliku = ({ url, i, naziv }) => {
        slika.style.backgroundImage = `url('${url}')`
        slika.onclick = () => { Otvori(i) }
        const naziv_klase = 'slajder-tacka-selektovano'
        let tacka = roditelj.querySelector('.' + naziv_klase)
        if (tacka) tacka.classList.remove(naziv_klase)
        tacka = roditelj.querySelectorAll('.slajder-tacka')[indeks - 1]
        tacka.classList.add(naziv_klase)
        tekst_element.innerText = naziv
    }
    const PodesiInterval = () => {
        interval = setInterval(() => {
            if (indeks == niz.length) indeks = 0
            PodesiSliku(niz[indeks++])
        }, 3000)
    }
    const ObrisiInterval = () => { clearInterval(interval) }
    niz = predmeti.map(({ n, i, naziv }, indeks_predmeta) => {
        const url = `slike/velike/${n}.jpg`
        let tacka = document.createElement('div')
        tacka.classList.add('slajder-tacka')
        roditelj.appendChild(tacka)
        tacka.onclick = () => {
            ObrisiInterval()
            indeks = indeks_predmeta + 1
            PodesiSliku({ url, i, naziv })
            PodesiInterval()
        }
        return { url, i, naziv }
    })
    PodesiSliku(niz[indeks++])
    PodesiInterval()
}

const PrikaziDevizniKurs = async () => { //ajax
    try {
        const odgovor = await fetch('https://www.floatrates.com/daily/eur.json')
        if (!odgovor.ok) return
        const podaci = await odgovor.json()
        document.getElementById('eur-rsd').innerText = `1 EUR = ${podaci.rsd.rate.toFixed(2)} RSD`
    }
    catch { }
}