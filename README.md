### Run

```bash
yarn install
```
```bash
yarn start
```

### Test

```bash
yarn test 
```

### Tech Choice Justification

- Typescript as language

I'm also comfortable with ES6 and it would take much less code for this particular application but I believe TS increases readability and scalability of the code.

- React

Because it's my to go frontend library.
    I prefered not to use hooks. I believe it's still controversial, react team promoting it to be used for getting feedback from users. Hooks decreases line of code and yet for most of the React developers class components are more familiar and easy to read.

- CRA to bootstrap application environment

Fast bootstrap and configured enough for this particular application

- react-icons for icons (just for three icons to make app a litle bit nicer)
- Jest / Enzyme for testing
- lodash.throttle for throttling scroll events

I could write my own throttle function but for most of the applications lodash or underscore would be already installed anyway.

### Architecture

I was planning to set up Flux architecture using Redux and Redux-Saga middleware for side effects and Reselect for selectors but I was adviced by Veronika to avoid using third party libraries as much as possible.

So I decided to use React context API to solve data storage and manipulation. So basically data storage and dispatching is done via two main components called ImageProvider and LayoutProvider which creates context and provides data and functions to their consumers.

 #### Structure

 - **src**
   - **api** : exports one function getImages which return an array of a structured ImageData
   - **components** : 
     - **AppBar** : renders search bar and layout options
     - **Image** : Pure component to render image respecting the aspect ratio
     - **ImageList** : responsible for rendering images composing InfiniteScroller and GridLayout components It's wrapped by context consumers to retrieve data and pass to it's children as their props.
     - **InfinteScroller** : A stateless component which takes onLoad function and loading status as props and renders it's children as an ordinary scroll view. Calculates the scroll position by listening throttled scroll events and calls onLoad if the scroll amount has reaced to a given proximity threshold. Uses status property to render spinner/error at the bottom. Props are provided by the parent ImageList component.
     - **SearchBox** : A small form with an input and a submit button. Takes a search function as prop and calls it when the form is submitted. Search prop is provided by AppBar component which uses ImageProvider to make a search and update context.
    - **providers** : Context for shared data and functions
      - **ImageProvider** : Creates a context and act as a store for image related data. Also provides functions to search images and load more images. Uses api to fetch images and keeps data in it's internal state.
      - **LayoutProvider** : Context for grid layout to configure column count for image grid (single or three columns). Used by ImageList to set GridLayout's columns props and by AppBar which updates the imageGridColumns property in the context.

### Things to improve

 I have spent around 8 hours for that challenge so I need to stop now. If I had more time to spent here are the things that I would improve.
 
 **more test** : Tests can always be improved as given more time

 **Virtualizing** : To improve image loading performance which are visible to the user I could have implemented a virtualizing mechnism which only loads the image in the view port. I could also use already existing libraries for that like react-window / react-virtualized

 **Styling / CSS** : Well I'm not a UX expert but I enjoy trying to make UI pretty. But that could take forever. And also I could come up with a better css or scss structure (also mybe CSS-in-JS solutions)
