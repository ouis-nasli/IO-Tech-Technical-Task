(https://io-tech-technical-task.vercel.app).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Project Structure

### Modules Folders :

```
- userManagement
  - users
  - groups
```

-   userManagement is a module
-   users and groups are submodules
-   module nameing format is camelCase

# Component as Module

In our project structure, we use a concept called "Component as Module". This pattern is used when a component has its own files and components. Here's how to apply it:

-   Put the component file in a folder. This folder now acts as a module.
-   Place all files related to this component in that folder.
-   Use files in this folder only within this component and its nested files.
-   Never use it outside of this folder or component.
-   All file and folder naming should follow the camelCase format, except for Component files and their folders.

For example:

Profile Component

```
- Profile
  - Profile.tsx
  - context
  - dummyData.ts
  - style.ts
  - helpers
      getSum.tsx
  - hooks
      useHash.tsx
```

If the component is large, you can break it down into multiple components:

-   These are called "local components" and should be placed in the components folder.

```
- Profile
  - Profile.tsx
      - components
          ProfileAvatar.tsx
          ProfileImagePicker.tsx
          ProfileFooter.tsx
  - context
  - dummyData.ts
  - style.ts
  - helpers
      getSum.tsx
  - hooks
```

This concept can be applied to any component, including Modules, Pages, Components, and Sub Components.


# Upsert 

Upsert = Update + Insert 
Upsert is not a component , it's just a concept you can apply in a component 
And here an example for that 

note : don't copy and paste ,this code is dummy 

## New

For Example


```tsx
import UpsertRecord from './components/UpsertRecord/UpsertRecord';
const RecordByIdNew: React.FC = () => {

	return (
		<>
				<UpsertRecord></UpsertRecord>
		</>
	);
};

```
## Edit 

For Example
```tsx
const RecordsByIdEdit: React.FC = () => {
	const { id } = useParams();

	/**
	 * "id as string"
	 *  this page component is '/:id'
	 *  so id will never be undefined
	 */
	const { data, isLoading } = useEquipmentByIdQuery(id as string);
	/** 
	 * create mapping function to map item by id interface to mution interface 
	 * 
	 */
	const initialValues = useMemo(() => (data != undefined ? convertRecordItemToMutation(data?.data) : undefined), [data]);

	return (
		<>
				{
				/**
					* just don't render Form In Upsert until loading finish and initialValues are ready 
					* ust loading example , use better than this loader
					*/
				}
				{isLoading ? (
					<>
						<Button>loading</Button> 
					</>
				) : (
					<UpsertRecord
						id={id}
						isEdit={true}
						initialValues={initialValues}
					></UpsertRecord>
				)}
		</>
	);
};

export default EquipmentsByIdEdit;


```

## Upsert

```tsx
interface UpsertRecordProps {
	initialValues?: IRecord;
}

const UpsertRecord: FC<UpsertRecordProps> = ({ initialValues , isEdit, id }) => {
	const { mutate, isLoading } = useRecordUpsertMutation(id, {
		onError(error) {
		},
		onSuccess() {
		},
	});

	return (
			<>
				<Form
					onFinish={mutate}
					initialValues={initialValues}
				>
				</Form>
			</>
	);
};

export default UpsertRecord;

```

### convertRecordItemToMutation
also this consept when GetRecordByID example Query return record in deferent interface when create it

for example 


```ts
interface IMutationRecord {
	name: string
	parent: string
	
}

interface IRecordItem {
	id : string
	name: string
	parent: {
		id : string
		name : string
	}
}
```
as you can see parent in IMutationRecord is string , but in IRecordItem is object 
so here you can map IMutationRecord to IRecordItem by implement function like this and use it in Edit Page before pass it to Upsert component component

```ts
export function convertRecordItemToMutation(item: IRecordItem): IMutationRecord {
	const {
		name,
		parent
	} = equipmentItem;

	return {
		name,
		parent: parent?.id,
	};
}

```




## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
