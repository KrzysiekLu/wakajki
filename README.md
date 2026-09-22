# Turcja — plan wycieczek

Statyczna strona (czysty HTML + CSS + JS, bez kroku budowania) z planem wycieczek na urlop
w Turcji — baza: **Notion Kesre Beach Hotel & Spa, Özdere**. Mobile-first, po polsku,
z mapami Leaflet/OpenStreetMap i linkami do Google Maps.

## Struktura projektu

```
index.html          — cała strona, treść generowana z danych przy wczytaniu
css/style.css        — style (jasny/ciemny motyw, mobile-first)
js/data.js            — DANE: hotel, wycieczki, kebaby, transport, info, źródła zdjęć
js/app.js              — silnik renderujący HTML i mapy na podstawie data.js
img/                     — zdjęcia atrakcji (WebP, lokalnie, z Wikimedia Commons)
netlify.toml               — konfiguracja Netlify (publish = ".")
```

## Jak edytować plan

Cała treść (poza sekcją nagłówka) generuje się z `js/data.js`. Żeby zmienić plan:

- **Zmienić/dodać punkt w wycieczce** — edytuj tablicę `points` w obiekcie wycieczki (`TRIPS`).
  Każdy punkt ma `time`, `name`, `lat`, `lng`, `desc`, opcjonalnie `photo`/`photos` (nazwa
  pliku z `img/`) i `alt` (alternatywa z własnymi współrzędnymi).
- **Dodać całą nową wycieczkę** — dopisz kolejny obiekt do `TRIPS`; zakładka w nawigacji,
  sekcja, mapa i przyciski "Cała trasa" pojawią się automatycznie.
- **Kebaby / transport / info** — edytuj tablice `KEBABS`, `TRANSPORT_INFO`, `PRACTICAL_INFO`.

Nie trzeba niczego budować ani instalować — wystarczy zapisać plik i odświeżyć stronę.

## Uruchomienie lokalnie

Strona korzysta ze zwykłych plików statycznych, ale otwarcie `index.html` bezpośrednio
z dysku (`file://`) może blokować niektóre żądania w przeglądarce — najlepiej odpalić
lekki serwer lokalny:

```bash
# Python (jest w zestawie z systemem na większości komputerów)
python -m http.server 8080

# albo Node.js
npx serve .
```

Potem wejdź na `http://localhost:8080`. Kafelki mapy (OpenStreetMap) wymagają połączenia
z internetem — reszta strony (treść, style, zdjęcia) działa też offline po pierwszym
wczytaniu, jeśli przeglądarka telefonu ma włączony cache.

## Zdjęcia i licencje

Zdjęcia atrakcji pochodzą z Wikimedia Commons (licencje CC0 / CC BY / CC BY-SA), zostały
pobrane, przeskalowane do szerokości ok. 1200 px i zapisane lokalnie w `img/` jako WebP —
strona nie hotlinkuje żadnych obrazów. Pełna lista autorów i licencji jest w sekcji
**„Źródła zdjęć”** na stronie oraz w `PHOTO_CREDITS` w `js/data.js`.

Jeśli chcesz podmienić zdjęcie: wrzuć nowy plik `.webp` (ok. 1200 px szerokości) do `img/`,
zaktualizuj pole `photo`/`photos` w danym punkcie w `js/data.js` i dopisz/zaktualizuj wpis
w `PHOTO_CREDITS`, żeby sekcja źródeł zostawała zgodna z prawdą.

## Wrzucenie na GitHub

```bash
git init
git add .
git commit -m "Plan wycieczek — Turcja"
git branch -M main
git remote add origin https://github.com/<twoj-uzytkownik>/<nazwa-repo>.git
git push -u origin main
```

(Adres repo utworzysz wcześniej na GitHubie — przyciskiem „New repository”, bez README/
licencji, żeby nie kolidowało z tym, co już jest lokalnie.)

## Podpięcie pod Netlify

1. Zaloguj się na [app.netlify.com](https://app.netlify.com) i wybierz **Add new site →
   Import an existing project**.
2. Wskaż repozytorium na GitHubie utworzone w kroku wyżej.
3. Ustawienia builda zostaw puste (**Build command**: brak, **Publish directory**: `.`) —
   są już zapisane w `netlify.toml`, więc Netlify wykryje je automatycznie.
4. Kliknij **Deploy site**. Po chwili strona będzie dostępna pod adresem `*.netlify.app`
   (można później podpiąć własną domenę w ustawieniach site'u).

Każdy kolejny `git push` do gałęzi `main` automatycznie przebuduje i wdroży stronę.

## Uwagi

- Wszystkie godziny otwarcia, ceny biletów i szczegóły dojazdu warto sprawdzić tuż przed
  wyjazdem — mogą się zmieniać.
- Współrzędne alternatyw (np. Cağhane, Petek Çöp Şiş) mają własne przyciski „Pokaż w Google
  Maps” / „Nawiguj”, ale nie wchodzą w skład trasy „Cała trasa w Google Maps” danej wycieczki.
