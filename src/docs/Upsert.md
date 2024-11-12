# Upsert 

Upsert = Update + Insert 
Upsert is not a component , i jsut a consept you can apply in a component 
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
also this consept when GetRecordByID example Query return record in deferect interface when create it

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
