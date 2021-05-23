**Struktura projektu i instalacja BooksAPI**

Zalecana struktura folderów wygląda następująco:

- Folder nadrzędny
    - frontend (Projekt React)
    - BooksAPI (Projekt z mojego repozytorium)

Projekt react i projekt BooksAPI muszą być osobno. Uruchamiamy je również osobno. Najpierw wchodzimy w BooksAPI, instalujemy zależności za pomocą npm, a następnie uruchamiamy skrypt `index.js`. 
Jeśli wyświetli się w konsoli komunikat: `Connected to postgres` oraz `Listening to localhost:<port>` to znaczy, że projekt został poprawnie uruchomiony. W drugim komunikacie widzimy również adres url pod którym, mamy wysyłać żądania.

**Obsługa API.**

Do projektu BooksAPI odwołujemy się za pomocą axiosa. Adres url jest widoczny w poprzednim podpunkcie. Musimy tylko dobrać odpowiednią końcówkę.

Dostępne endpointy:

`axios.post('http://localhost:<port>/api/book', obiekt_z_książką)` - tworzy książkę o przesłanych w body wartościach. Możemy przesłać tylko poniższe pola:

```
{
    "title": "",
    "author": "",
    "genre": "",
    "release_date": "",
    "description": "",
    "image_url: ""
}

```


Proszę zwrócić uwagę jakie wartości dostają Państwo po wstawieniu nowej książki w response!
Proszę przejrzeć plik SQL, żeby sprawdzić, które pola są wymagane i nanieść te wymagania na formularze.


`axios.get('http://localhost:<port>/api/book')` - pobiera wszystkie książki.


`axios.get('http://localhost:<port>/api/book/:id')` np. http://localhost:5000/api/book/5 - pobiera książkę o podanym id.


`axios.post('http://localhost:<port>/api/book/:id/rate', obiekt_z_oceną)` np. http://localhost:5000/api/book/5/rate, { score: 5 } - 'ocenia' daną książkę. Dzięki wykonaniu tej komendy, rating zwracany w liście książek powinien przestać być równy null. 

`axios.delete('http://localhost:<port>/api/book/:id')` np. http://localhost:5000/api/book/5 - usuwa książkę o podanym id.


`axios.put('http://localhost:<port>/api/book/4', obiekt_z_książką)` - aktualizuje dane o książce. Co ważne, edytujemy książkę o id podanym w url. Możemy przesłać pola analogiczne jak w przypadku post.

**Podział na komponenty React**

Najlepiej podzielić stronę na 'sekcje'. Proszę traktować swoją stronę jako strukturę modularną - w każdej chwili możemy doczepić jakiś moduł, albo odczepić i ten fakt nie powinien psuć naszej aplikacji. 

Na pewno możemy wyodrębnić parę komponentów w prawie każdej stronie internetowej:
- App.js
- Navbar.js
- Sidebar.js
- Searchbar.js
- ElementList.js
- Element.js
- ElementDetails.js
- ElementForm.js

Jest to tylko przykład, ale może Państwa zainspiruje. Oczywiście można dobrać inne komponenty. 

**React Router**

Jako, że na wykładzie był już React Router, to chcielibyśmy, żeby Państwo zastosowali go w projekcie. Powinno to wbrew pozorom ułatwić Państwu zadanie - nie musimy już sterować widocznością poszczególnych elementów, ale po prostu przekierować na inną stronę. 

Przykładowy scenariusz:

1. Aplikacja uruchamia się i widzimy zawartość App.js, który ma pod sobą komponent z listą książek. Klikamy na daną książkę i aplikacja przekierowuje nas pod adres http://localhost:3000/books/4. W routingu pod tym adresem jest komponent o nazwie ElementDetails.js, który w useEffect() pobiera książkę o id, które jest w adresie URL. Gdy pobieranie się powiedzie, to ta książka jest wyświetlana w komponencie. 

Szczegółowo o React Router będziemy mówić na najbliższych laboratoriach. Nie powinno to wpłynąć na Państwa pracę, ponieważ Router można również dodać na późniejszym etapie prac.

**Materiały**

Polecam zapoznać się z poniższymi artykułami

[React-router](https://medium.com/the-andela-way/understanding-the-fundamentals-of-routing-in-react-b29f806b157e)

[Struktura plików 1](https://pl.reactjs.org/docs/faq-structure.html)

[Struktura plików 2](https://www.robinwieruch.de/react-folder-structure)

[Axios z API](https://rapidapi.com/blog/axios-react-api-tutorial/)
