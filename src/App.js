import { useRef, useState } from 'react';
import axios from 'axios';
import './styles/compiled.css';

const APP_ID = 'ff0ebd8a';
const APP_KEY = '4757ecddd1d05c6f9ae6008bd7a87b3f';

function App() {
	const [recipes, setRecipes] = useState([]);
	const recipeRef = useRef();

	const fetchData = (e) => {
		e.preventDefault();
		axios
			.get(
				`https://api.edamam.com/search?q=${recipeRef.current.value}&app_id=${APP_ID}&app_key=${APP_KEY}`
			)
			.then((response) => {
				setRecipes(response.data.hits);
			})
			.catch((error) => console.log(error));
	};

	console.log(recipes);

	return (
		<div className='flex flex-col items-center'>
			<div>
				{/* FORM */}
				<form className='flex justify-center mt-6'>
					<input className='mr-10' type='text' placeholder='Search Recipe' ref={recipeRef} />
					<button onClick={fetchData}>FETCH</button>
				</form>
			</div>
			{/* CARD */}
			<div style={{ maxWidth: '700px' }} className='p-4'>
				{recipes.map((item, index) => {
					return (
						<div className='flex justify-center p-4 shadow-xl m-4' key={index}>
							{/* IMAGE DIV */}
							<div
								className='h-86 w-60 bg-center'
								style={{
									backgroundImage: `url(${item.recipe.image})`,
									backgroundRepeat: 'no-repeat',
								}}
							></div>
							{/* INFO SEC */}
							<section className='text-left p-4 flex-1'>
								<p className='font-semibold tracking-wider text-lg mb-6'>{item.recipe.label}</p>

								<div className='flex mb-2 items-center'>
									<p className='text-gray-600 uppercase font-semibold text-xs'>cousine type:</p>
									<div className='flex items-center'>
										{item.recipe.cuisineType ? (
											item.recipe.cuisineType.map((type) => {
												return (
													<div
														className='text-white font-semibold uppercase text-xs px-6 py-1 rounded-md ml-4'
														style={{ backgroundColor: 'dodgerblue' }}
													>
														<p>{type}</p>
													</div>
												);
											})
										) : (
											<p>No Cuisine Type</p>
										)}
									</div>
								</div>
								<div className='flex mb-4 items-center'>
									<p className='text-gray-600 uppercase font-semibold text-xs'>diet:</p>
									<div>
										{item.recipe.dietLabels.map((label) => {
											return (
												<div
													className='text-white font-semibold uppercase text-xs px-6 py-1 rounded-md ml-4'
													style={{ backgroundColor: 'darkturquoise' }}
												>
													<p>{label}</p>
												</div>
											);
										})}
									</div>
								</div>
								{/* INGREDIENTS */}
								<ul>
									<p className='text-gray-600 uppercase font-semibold text-xs mb-2'>ingredients:</p>
									<div>
										{item.recipe.ingredientLines.map((ingredient) => {
											return (
												<div className='text-xs text-black font-semibold mb-0.5'>
													<li>{ingredient}</li>
												</div>
											);
										})}
									</div>
								</ul>
								{/* BUTTON */}
								<button
									style={{ backgroundColor: 'dodgerblue' }}
									className='w-full text-white rounded-md mt-6 p-1 uppercase font-semibold'
									onClick={() => {
										window.open(item.recipe.url, '_blank');
									}}
								>
									View
								</button>
							</section>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
