PART 1 - REACT APP <br>
<img width="1384" alt="Screenshot 2023-09-27 at 20 34 30" src="https://github.com/semiherd/deel_interview/assets/82077230/ca8b9704-94f8-4ac3-9e20-e02e633fa2af">
<br><br>
PART 2 - QUESTIONS

1. What is the difference between Component and PureComponent? Give
an example where it might break my app.
	Component renders when parent re-renders or props of the component changes.
	However PureComponent checks the props and state of the component and if there is an update , it re-renders the component. It prevents unnecessary re-renders.
	UseCase: when our component have functions or objects as props, PureComponent will not detect the change because it does implement shallow comparison which only consists of reference check, not the values inside.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?
	ShouldComponentUpdate might block the propagation of Context to child components. 
	That is why we have to be careful while using Context. It mostly happen when we store our state directly in context, on the contrary we had better use context as dependency system and components should receive context once.

3. Describe 3 ways to pass information from a component to its PARENT.
	1. Passing a function to child as prop
		a. Define a function in the parent component
		b. Passing a function as a prop to the child 
		c. Calling the function with the related data as an argument in child component
		d. Accessing data in the function defined in the parent
	2. Using useRef
		a. Define a useRef for the specific element
		b. Use forwardRef to forward that reference to child component
		c. Update this ref in child component by assigning myRef.current.value=‘testValue’
	3. Using useContext
		a. Define a context provider
		b. Render parent component under this provider
		c. Update context in the child component 
		d. Access data in the parent component through calling context api

4. Give 2 ways to prevent components from re-rendering.
	1. We can use React.memo for components, useMemo hook for caching values and useCallback for caching functions  to prevent re-rendering. However it does not guarantee preventing re-render because re-render is triggered with state update. If there is a state update on the parent component, it does not work.
	2. Second alternative is using composition method in order to prevent re-render because of the state update and we can isolate state update into another component by using composition. In this way we can prevent re-render of the sibling or child component.

5. What is a fragment and why do we need it? Give an example where it might
break my app.
	We have to use all components under one parent, otherwise we will have with syntax error.
	when we do not need a div on Dom-tree when rendering multipler components, we use fragments to group all in one fragment and we prevent unnecessary div as well.
	Fragment can not have state or props which will lead to error.

6. Give 3 examples of the HOC pattern.
	1. Working with DOM Elements, for example when we would like to add a feature for multiple components like a common behavior on pressing a specific character.
	2. When we need to use a logging process for multiple components. Instead of using custom hook and copy-paste the logic to all components we use it. We can only create a HOC as 
	export const WithLogOnClick = WithLogOnClick(Component);
	3. On React Context, when context value changes, it re-renders all consumers under context provider. By using we cannot prevent re-renders. We can use memorization and stop chain of re-renders.
	
	
7. What's the difference in handling exceptions in promises, callbacks
and async...await?
	Both are types of handling async processes.
	By using Callbacks , it is a continuing process  where we pass a function as an argument to another function, and it is executed after the first function has completed.
	By using async/await, we use try-catch-finally block. Async keyword is used to define the async function and await keyword is used to wait until the the promise is resolved. 
	We handle the error in catch block. Finally block is used for the process to be handled independent from reject or resolve state.

8. How many arguments does setState take and why is it async.
	It has 2 arguments, one is the value and the second is the function to update this value as “const [state,setState]= React.useState(null)”
	With its async property it enables our browser to be responsive on changes and this brings a better ux.

9. List the steps needed to migrate a Class to Function Component.
	1. Change syntax of defining functional component
		From => class Comp extends react.Component {}
		To => function Comp(props){}
	2. Remove constructor and add useState hook for each prop in constructor
		From => constructor(props){
			this.state={
				prop1: ‘prop1’,
				prop2: 3
			}
		}
		To =>
			const [prop1,setProp1]= React.useState(‘prop1)
			const [prop2,setProp2]= React.useState(3)
	2. Remove render block on class with return block in function component
		From => render() {
			return (<div></div>)
		}
		To => return (<div></div>)
	3. Create methods in functional component for each method in class component
		From => onChange(e){}
		To => const onChange= (e) => {}
	4. Remove this. references
		From => <button onClick={this.handleOnClick}>Test Button</button>
		To => <button onClick={handleOnClick}>Test Button</button>
	5. Replace lifecycle methods with hooks
		use React.useEffect with related dependency array for componendDidMount(), componentWillUnmount 
		use useEffect with empty dependency array instead of componentDidMount()
	6. Change PureComponent with React.memo	
10. List a few ways styles can be used with components.

	* inline styling like 
		const App= () => {
			return <div style={{margin: ’5%’, border: ‘2px solid red’}} />
		}
	* className in js file like
		const styles={
			container: { border: ‘2px solid red, margin: ’25%’},
			item: { color: ‘blue’, fontWeight: ‘bold’, fontSize: ‘20px’ }
		}
		const App= () => {
			return <div className={styles.container} />
		}
	* css module like 
		App.style.css file
			.container{
				 border: ‘2px solid red, margin: ’25%’
			},
			item: { 
				color: ‘blue’, fontWeight: ‘bold’, fontSize: ‘20px’ 
			}
		App.js	
		import style from ‘./App.style.css’
		const App= () => {
			return <div className={styles.container} />
		}
	*scss and sass as css preprocessors like
		&red-color: #FF0000;
		.container{
    			border: 2px solid &red-color;
		 }
 	* styled components like
		const StyledDiv= styled.div`
			color: blue;
			font-size: 15px
		`
		const App= () => {
			return <StyledDiv  />
		}
11. How to render an HTML string coming from the server.
	By setting the prop  dangerouslySetInnerHTML on the react element 
		const html = `<div><h1>HTML</h1></div>`
		return <div dangerouslySetInnerHTML={{ __html: html }}></div>
