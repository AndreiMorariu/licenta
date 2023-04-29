import './SearchBar.css';
import './SearchBar';
import { AiOutlineSearch } from 'react-icons/ai';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." className="search-input" />{' '}
      <AiOutlineSearch className="search-icon" />
    </div>
  );
}

export default SearchBar;
