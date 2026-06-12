# Zadanie: dwa nowe artykuły na mix-i-master.pl (pod ruch i klikalność) + obsługa zdjęć

Cel: dwa nowe artykuły, które odpowiadają na pytania, które ludzie faktycznie wpisują w Google z czystej
ciekawości lub frustracji - mają przyciągnąć ruch i naturalnie poprowadzić do innych artykułów o
produkcji/miksowaniu na stronie.

Zanim zaczniesz: przeanalizuj istniejący, najnowszy artykuł w `artykuly/` (struktura head: meta/OG/Twitter,
schema jeśli używane, nawigacja, sekcja autora, spis treści, FAQ, "przeczytaj też", stopka, paleta kolorów:
ciemne studyjne tło, akcenty cherry red #E05C5C, yellow #F5C518, green #4DCC6A) i zastosuj identyczny
wzorzec dla obu nowych plików - taki sam format HTML+CSS+JS jak pozostałe artykuły. Sprawdź też, czy
artykuły linkują obrazy z `images/` czy `assets/` - i trzymaj się tej samej konwencji.

## Obrazy - zrób to jako pierwszy krok

W głównym folderze projektu (poziom `decybel/`, nie w `images/`/`assets/`) znajduje się 7 zdjęć dodanych
przez Michała:
- `spotify (1).jpg`, `spotify (2).jpg`, `spotify (3).jpg` - do artykułu o tantiemach Spotify
- `zly-mix (1).jpg`, `zly-mix (2).jpg`, `zly-mix (3).jpg`, `zly-mix (4).jpg` - do artykułu o brzmieniu
  miksu na różnych głośnikach

1. W projekcie jest już skrypt `compress-images.js` - sprawdź, co robi i jak jest uruchamiany (np. w
   `package.json` / README), i użyj go (lub w razie potrzeby rozszerz) do skompresowania tych 7 plików.
   Cel: szerokość maks. ok. 1200-1600px (zachowaj proporcje), format webp jeśli skrypt to wspiera, jakość
   ok. 75-80%.
2. Przenieś skompresowane pliki do folderu używanego przez istniejące artykuły (`images/` lub `assets/` -
   sprawdź konwencję) i zmień nazwy na proste, opisowe, bez spacji i nawiasów, np.:
   - `spotify (1).jpg` → `spotify-tantiemy-1.jpg` (lub `.webp`, jeśli konwertujesz)
   - `spotify (2).jpg` → `spotify-tantiemy-2.jpg`
   - `spotify (3).jpg` → `spotify-tantiemy-3.jpg`
   - `zly-mix (1).jpg` → `mix-glosniki-1.jpg`
   - `zly-mix (2).jpg` → `mix-glosniki-2.jpg`
   - `zly-mix (3).jpg` → `mix-glosniki-3.jpg`
   - `zly-mix (4).jpg` → `mix-glosniki-4.jpg`
3. Usuń oryginalne, nieskompresowane wersje z głównego folderu po przeniesieniu, żeby nie zostawiać
   duplikatów.
4. Rozłóż zdjęcia w artykułach: w każdym artykule jedno zdjęcie jako hero (article-figure na początku),
   a pozostałe rozmieść w treści przy sekcjach, do których wizualnie najlepiej pasują (oceń to na
   podstawie zawartości zdjęć - np. zdjęcie ekranu z analizatorem widma/zielonym wykresem dobrze pasuje
   do sekcji o teście mono i analizie częstotliwości). Nie musisz użyć wszystkich zdjęć "po kolei" -
   dopasuj sensownie tematycznie.

---

## ARTYKUŁ 1: "Ile Spotify płaci za jedno odtworzenie? Prawda o tantiemach"

**Proponowany slug:** `artykuly/ile-spotify-placi-za-odtworzenie.html`
**Title:** Ile Spotify płaci za jedno odtworzenie? Prawda o tantiemach (2026)
**Meta description:** Ile naprawdę zarabia muzyk na jednym odtworzeniu w Spotify? Sprawdź realne stawki
za streaming, policz na konkretnym przykładzie i dowiedz się, co faktycznie wpływa na zarobki
niezależnego artysty.
**Keywords:** ile płaci spotify za odtworzenie, zarobki na spotify, tantiemy spotify, ile zarabia
muzyk na streamingu, spotify stawka za stream

> Uwaga dla Claude Code: stawki za odtworzenie podawaj jako szacunkowe przedziały ("ok.", "od - do"), z
> wyraźnym zastrzeżeniem, że realna stawka zależy od kraju słuchacza, typu konta (darmowe/premium),
> umowy z dystrybutorem i tzw. modelu "pro-rata" stosowanego przez platformy streamingowe. Nie podawaj
> jednej sztywnej liczby jako "prawdy" - zachowaj ton "tu są realne rzędy wielkości, a nie marketingowa
> bajka o milionach z TikToka". Na zdjęciach nie twórz/nie dodawaj logo Spotify - jeśli na zdjęciach
> dodanych przez Michała widoczny jest ekran z aplikacją, to ok, ale nie generuj/nie modyfikuj grafik
> tak, by eksponować markę Spotify jako element brandingowy artykułu.

### H1
Ile Spotify płaci za jedno odtworzenie? Prawda o tantiemach

### Lead / hook (użyj w całości lub zbliżonej formie)
Twój kawałek ma 10 000 odtworzeń na Spotify. Brzmi jak sukces, prawda? A teraz pytanie, które zadaje sobie
każdy początkujący producent i artysta: ile na tym faktycznie zarobiłeś? Odpowiedź może Cię zaskoczyć -
w obie strony.

W tym artykule rozkładamy temat tantiem ze streamingu na czynniki pierwsze: jakie są realne stawki za
odtworzenie, ile trzeba mieć streamów, żeby zarobić konkretną kwotę, i - co najważniejsze - dlaczego sama
liczba odtworzeń to dziś tylko część obrazka.

### Sekcje (rozwiń do pełnych akapitów w tonie strony - merytoryczny, ale przystępny)

**H2 - Ile realnie płaci Spotify za jeden stream**
- wyjaśnij model "pro-rata": Spotify dzieli przychód z abonamentów i reklam proporcjonalnie do udziału
  danego utworu we wszystkich odtworzeniach w danym kraju/miesiącu - nie płaci stałej kwoty per stream
- podaj orientacyjny przedział (np. "od ułamka grosza do kilku groszy" w przeliczeniu na PLN) z
  zastrzeżeniem o zmienności
- zaznacz, że stawka różni się też w zależności od kraju słuchacza (rynki o wyższych cenach abonamentów
  generują wyższy przychód)

**H2 - Przykład: ile trzeba odtworzeń, żeby na tym zarobić**
- relatable przykład liczbowy: ile odtworzeń odpowiada np. cenie jednego obiadu, miesięcznego abonamentu
  na streaming, czynszu - pokaż skalę w przystępny sposób
- podkreśl, że dla niezależnego artysty bez dużej bazy słuchaczy sam Spotify rzadko jest głównym źródłem
  dochodu - i to jest normalne, nie powód do zniechęcenia

**H2 - Dlaczego liczba odtworzeń to nie cała prawda**
- wyjaśnij, że z tantiem ze streamingu często trzeba "wykroić" udział wydawcy/dystrybutora, a osobno
  funkcjonują tantiemy autorskie (kompozycja/tekst), niezależne od tantiem za nagranie (master)
- wymień inne realne źródła dochodu: sprzedaż beatów i sample packów, usługi mix/mastering dla innych
  artystów, koncerty/występy, sync (muzyka do reklam, filmów, gier), placement w playlistach
  redakcyjnych

**H2 - Co realnie zwiększa Twoje szanse na sukces w streamingu**
- jakość produkcji (miks i mastering) jako "bilet wstępu" - playlisty redakcyjne i algorytmiczne
  promują utwory, które brzmią konkurencyjnie na każdym systemie odtwarzania
- konsekwencja wydawania nowej muzyki, budowanie społeczności poza samym Spotify
- naturalne przejście: link do innych artykułów na stronie o miksowaniu/masteringu (np. EQ, kompresja)
  oraz do drugiego nowego artykułu "Dlaczego Twój mix brzmi super w słuchawkach, a do kitu na głośniku
  telefonu?"

### FAQ (sekcja FAQ, schema FAQPage)

**Czy małym artystom opłaca się wgrywać muzykę na Spotify?**
Tak, ale nie należy traktować tego jako głównego źródła dochodu na start. Obecność na Spotify to przede
wszystkim budowanie zasięgu, statystyk i wiarygodności (np. przy rozmowach o koncertach czy
współpracach), a realne tantiemy rosną dopiero przy dużej skali odtworzeń.

**Ile odtworzeń potrzeba, żeby zarobić zauważalną kwotę?**
Ze względu na model pro-rata i niskie stawki jednostkowe, zauważalne kwoty (rzędu kilkuset-kilku tysięcy
złotych miesięcznie) wymagają zwykle dziesiątek lub setek tysięcy odtworzeń miesięcznie - co w praktyce
oznacza utwór, który "złapał" playlisty lub viralowy zasięg.

**Czy inne platformy (YouTube Music, Apple Music, Tidal) płacą więcej niż Spotify?**
Stawki różnią się między platformami i zmieniają się w czasie, ale generalnie żadna z dużych platform
streamingowych nie płaci na tyle, by sam streaming był głównym źródłem dochodu dla artystów poza ścisłym
topem. Dlatego warto dystrybuować muzykę na wszystkie platformy jednocześnie, traktując to jako sumę
małych źródeł.

**Jak zwiększyć szansę na trafienie do playlist Spotify?**
Kluczowe są: regularność wydawania nowości, dobrze opisany profil artysty, składanie utworów do Spotify
for Artists z wyprzedzeniem przed premierą oraz - co często bywa niedocenione - jakość samego miksu i
masteringu, bo redaktorzy playlist porównują utwory ze sobą na tych samych systemach odsłuchowych.

### Przeczytaj też
- link do artykułu o EQ (jeśli istnieje)
- link do artykułu o kompresji (jeśli istnieje)
- link do drugiego nowego artykułu: "Dlaczego Twój mix brzmi super w słuchawkach, a do kitu na głośniku
  telefonu?"

### Obrazy do tego artykułu
Użyj 3 zdjęć z grupy "spotify" (po kompresji i zmianie nazwy, patrz wyżej): jedno jako hero
(article-figure na początku), pozostałe dwa rozmieść w treści przy sekcjach, do których wizualnie
najlepiej pasują.

---

## ARTYKUŁ 2: "Dlaczego Twój mix brzmi super w słuchawkach, a do kitu na głośniku telefonu?"

**Proponowany slug:** `artykuly/dlaczego-mix-brzmi-inaczej-na-glosnikach.html`
**Title:** Dlaczego mix brzmi super w słuchawkach, a do kitu na głośniku telefonu?
**Meta description:** Twój mix brzmi świetnie w słuchawkach, ale słabo na głośniku telefonu lub w
aucie? Sprawdź najczęstsze przyczyny i konkretne poprawki - test mono, kontrola basu i szerokości
stereo.
**Keywords:** dlaczego mix brzmi inaczej na głośnikach, mix brzmi słabo na telefonie, test mono w
miksie, mix a słuchawki, jak miksować żeby brzmiało wszędzie

### H1
Dlaczego Twój mix brzmi super w słuchawkach, a do kitu na głośniku telefonu?

### Lead / hook (użyj w całości lub zbliżonej formie)
Wkładasz słuchawki, odsłuchujesz swój najnowszy mix i myślisz: "to brzmi naprawdę dobrze". Chwilę później
puszczasz ten sam plik na głośniku telefonu albo w aucie - i coś jest nie tak. Bas zniknął, wokal jest
zagubiony gdzieś w tle, całość brzmi płasko i cienko.

To nie jest Twoja wina (przynajmniej nie cała) - ale to też nie jest coś, co musisz zaakceptować. W tym
artykule wyjaśniamy, dlaczego mix brzmi inaczej na różnych systemach odsłuchowych, co najczęściej za to
odpowiada w samym miksie i jak to przetestować i poprawić, zanim wyślesz utwór dalej.

### Sekcje (rozwiń do pełnych akapitów)

**H2 - To nie magia: różne głośniki to inna fizyka**
- różnice między słuchawkami (blisko uszu, pełne pasmo, sztuczna szerokość stereo) a małymi głośnikami
  telefonu/laptopa (malutkie przetworniki, brak realnego basu poniżej ok. 150-200 Hz, odtwarzanie często
  w mono lub quasi-mono)
- konkluzja: jeśli mix "żyje" tylko dzięki elementom, których małe głośniki nie potrafią odtworzyć (głęboki
  bas, ekstremalnie szerokie stereo), na małym systemie zabrzmi pusto

**H2 - Najczęstsi winowajcy w Twoim miksie**
1. Zbyt dużo "życia" utworu schowane poniżej ~150 Hz - telefon i laptop tego nie odtworzą, mix traci
   energię
2. Zbyt szerokie stereo na kluczowych elementach (bas, kick, lead wokal) - przy sumowaniu do mono (tak
   odtwarza wiele głośników) elementy te częściowo się wyciszają lub "rozjeżdżają"
3. Maskowanie w średnicy - zbyt wiele instrumentów walczy o to samo pasmo, na małym głośniku robi się
   "papka"
4. Zbyt niski poziom głośności / brak odpowiedniego masteringu - na małych głośnikach różnice w głośności
   są bardziej słyszalne, więc "cichy" mix wypada wyjątkowo słabo

**H2 - Test mono: najważniejsze narzędzie, którego pewnie nie używasz**
- jak sprawdzić mix w mono (przełącznik mono w DAW lub na monitorach/interfejsie)
- jeśli po przełączeniu na mono bas "znika" albo wokal robi się głośniejszy/cichszy w nieoczekiwany
  sposób - sygnał problemu ze stereo
- praktyczna zasada: bas i kick trzymaj w mono (lub blisko mono), szerokość stereo zostaw elementom
  ozdobnym (pady, gitary w tle, efekty)

**H2 - Jak testować mix na różnych systemach**
- odsłuch na min. 3 systemach: dobre monitory/słuchawki referencyjne, głośnik telefonu/laptopa, jeśli
  możliwe - samochód
- porównanie z referencyjnym, profesjonalnie zmiksowanym utworem z tego samego gatunku odtwarzanym na
  tych samych systemach
- odsłuch na niskim poziomie głośności - na małym głośniku i tak będzie cicho, więc warto wiedzieć, jak
  mix "trzyma się" przy niskiej głośności

**H2 - Szybkie poprawki, które możesz zrobić już teraz**
- zsumuj bas i kick do mono (lub ogranicz szerokość stereo poniżej ~150 Hz dla całego miksu)
- sprawdź mix w mono i posłuchaj, czy wokal, bas i kick są nadal wyraźne
- delikatne podkreślenie pasma 2-5 kHz może pomóc "przebić się" przez małe głośniki bez zwiększania
  głośności basu
- jeśli na stronie istnieje artykuł o EQ lub kompresji - dodaj tu naturalny link jako "kolejny krok"

### FAQ (sekcja FAQ, schema FAQPage)

**Czy mix powinien brzmieć dobrze w mono?**
Tak - to jeden z najlepszych testów jakości miksu. Wiele systemów odtwarzania (głośniki telefonów, część
głośników bluetooth, systemy nagłośnieniowe w klubach) odtwarza dźwięk w mono lub bliskim mono. Jeśli
kluczowe elementy miksu znikają lub zmieniają się drastycznie po przełączeniu na mono, oznacza to, że
zbyt wiele "życia" utworu zależy od efektów stereo.

**Dlaczego bas znika na głośniku telefonu?**
Małe przetworniki w telefonach i laptopach fizycznie nie są w stanie odtworzyć bardzo niskich
częstotliwości (zwykle poniżej 150-200 Hz). Jeśli Twój bas i kick mają główną energię właśnie w tym
zakresie, na małym głośniku po prostu "nie usłyszysz" tej części miksu - dlatego ważne jest, by te
elementy miały też obecność w wyższych częstotliwościach (np. wyraźny atak kicka, harmoniczne basu).

**Jakie utwory warto wykorzystać jako referencję?**
Najlepiej wybrać profesjonalnie wydane utwory z tego samego gatunku, o podobnej instrumentacji do Twojego
projektu, i odsłuchiwać je na tych samych systemach co własny mix - to pozwala porównywać "jabłka z
jabłkami" i wyłapać różnice w balansie częstotliwości, głośności i szerokości stereo.

**Czy warto miksować na słuchawkach?**
Słuchawki są przydatne do wychwytywania detali, szumów i problemów ze stereo, ale dają nierealistyczny
obraz basu i przestrzeni w porównaniu z głośnikami. Najlepiej traktować słuchawki jako jedno z kilku
narzędzi odsłuchowych, a kluczowe decyzje dotyczące balansu i basu weryfikować na monitorach i małych
głośnikach.

### Przeczytaj też
- link do artykułu o EQ (jeśli istnieje)
- link do artykułu o kompresji (jeśli istnieje)
- link do pierwszego nowego artykułu: "Ile Spotify płaci za jedno odtworzenie? Prawda o tantiemach"

### Obrazy do tego artykułu
Użyj 4 zdjęć z grupy "zly-mix" (po kompresji i zmianie nazwy, patrz wyżej): jedno jako hero
(article-figure na początku), pozostałe trzy rozmieść w treści przy sekcjach, do których wizualnie
najlepiej pasują (np. zdjęcie ekranu z zielonym wykresem/analizatorem - sekcja o teście mono lub o
analizie częstotliwości; zdjęcia ze studia/konsoli mikserskiej - hero lub sekcja "jak testować mix").

---

## Zadania techniczne po napisaniu obu artykułów

1. Dodaj oba artykuły do listy/sekcji artykułów na stronie głównej (`index.html`), w formacie kart jak
   istniejące wpisy.
2. Dodaj oba nowe adresy URL do `sitemap.xml`.
3. Dodaj wzajemne linkowanie między obydwoma nowymi artykułami oraz - jeśli istnieją - do artykułów o EQ
   i kompresji (i odwrotnie - dodaj 1 link z tych artykułów do nowych, tam gdzie ma to sens
   kontekstowo).
4. Ustaw daty publikacji/modyfikacji na dzisiejszą datę, zgodnie z formatem używanym w innych artykułach.
5. Zachowaj dotychczasową paletę kolorów i estetykę strony (ciemny, studyjny styl, akcenty VU meter).

Pracuj autonomicznie, nie pytaj o potwierdzenie, zapisz zmiany we wszystkich plikach projektu.
