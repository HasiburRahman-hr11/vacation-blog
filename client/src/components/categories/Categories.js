/* eslint-disable jsx-a11y/anchor-is-valid */
import './categories.css';
import { CallMade } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const CategoryItem = ({ category }) => {
    return (
        <Link to={`/category/${category.toLowerCase()}`} className="cat_list_link d-flex align-items-center justify-content-between">
            <span className="cat_link_title">{category}</span>
            <CallMade className="cat_link_icon" />
        </Link>
    )
}


const Categories = () => {
    return (
        <div className="home_section categories_section">
            <div className="categories_wrapper">
                <div className="container">
                    <div className="cat_list">
                        <div className="cat_list_item">
                            <CategoryItem category="Paris" />
                        </div>
                        <div className="cat_list_item">
                            <CategoryItem category="Switzerland" />
                        </div>
                        <div className="cat_list_item">
                            <CategoryItem category="Italy" />
                        </div>
                        <div className="cat_list_item">
                            <CategoryItem category="Asia" />
                        </div>
                        <div className="cat_list_item">
                            <CategoryItem category="Norway" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;