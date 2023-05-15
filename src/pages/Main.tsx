import { RiLoginBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Counter from "../components/Counter";

export interface AuthPageProps {}

const Main: React.FC<AuthPageProps> = ({}) => {
	return (
		<div className="w-screen h-screen grid justify-center items-center ">
			<div className="flex flex-col w-[500px] gap-5 justify-center">
				<p className="text-center font-bold">This is main page of the app</p>
				<Counter />
				<Link
					to="/auth"
					className="flex gap-2 justify-center items-center py-2 bg-neutral-400 hover:bg-slate-500/70 text-neutral-800 rounded-xl transition"
				>
					<RiLoginBoxLine size={20} /> Go to login Page
				</Link>
			</div>
		</div>
	);
};

export default Main;
