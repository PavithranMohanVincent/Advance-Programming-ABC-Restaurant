import React, { useState } from 'react';
import { menu_list } from '../../assets/assets';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
    const [category, setCategory] = useState("All");

    return (
        <div className="container py-5" id="menu">
            {/* Title Section */}
            <div className="text-center mb-4">
                <h1>Explore Our Menu</h1>
                <p className="lead">
                    Welcome to a culinary journey where tradition meets innovation. Our carefully curated menu offers a diverse selection of dishes designed to satisfy every palate. Whether you're in the mood for something light and refreshing or hearty and comforting, our offerings range from timeless classics to contemporary creations. Each dish is prepared with the finest ingredients, emphasizing fresh, local produce, and the rich, bold flavors that define our cuisine.
                </p>
            </div>

            
            {/* Food Display Section */}
            <FoodDisplay  />

           
        </div>
    );
};

export default Menu;
