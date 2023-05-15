import { Button, Grid } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { selectCount } from "../redux/slices/counterSlice";
import { increment, decrement } from "../redux/slices/counterSlice";

export interface CounterProps {}

const Counter: React.FC<CounterProps> = ({}) => {
	const dispatch = useDispatch();
	const count = useSelector(selectCount);

	return (
		<Grid>
			<Grid.Col span={4}>
				<Button
					onClick={() => dispatch(decrement())}
					variant="filled"
					color="red"
					className="w-full p-0"
				>
					Decrement
				</Button>
			</Grid.Col>
			<Grid.Col span={4}>
				<div className="w-full h-full grid items-center justify-center text-4xl">
					{count}
				</div>
			</Grid.Col>
			<Grid.Col span={4}>
				<Button
					onClick={() => dispatch(increment())}
					variant="filled"
					color="lime"
					className="w-full p-0"
				>
					Increment
				</Button>
			</Grid.Col>
		</Grid>
	);
};

export default Counter;
