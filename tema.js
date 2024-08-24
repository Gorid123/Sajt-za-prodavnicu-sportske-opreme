const kutija = document.getElementById('tema-slajder')
const krug = document.getElementById('tema-slajder-krug')
var svetla_tema = true

const BezTranzicije = (elementi, poziv, ukljuceno) => {
    if (!ukljuceno) {
        poziv()
        return
    }
    elementi.forEach(element => { element.classList.add('beztranzicije') })
    poziv()
    elementi.forEach(element => {
        element.offsetHeight
        element.classList.remove('beztranzicije')
    })
}

const PromeniTemu = (odmah = false) => {
    BezTranzicije([kutija, krug, document.body], () => {
        kutija.classList.toggle('mracna-tema')
        document.body.classList.toggle('mracna-pozadina')
    }, odmah)
    svetla_tema = !svetla_tema
    if (odmah) return
    PodesiKolacic()
}
kutija.onclick = () => { PromeniTemu() }

const naziv_kolacica = 'tema'
const PodesiKolacic = () => {
    let date = new Date()
    date.setTime(date.getTime() + 365 * 24 * 3600 * 1000)
    document.cookie = `${naziv_kolacica}=${svetla_tema};expires=${date.toUTCString()};path=/`
}

const uzmiKolacic = () => document.cookie ? document.cookie.split(';')[0].split('=')[1] === 'true' : true

const UcitajTemu = () => { if (!uzmiKolacic()) PromeniTemu(true) }

UcitajTemu()