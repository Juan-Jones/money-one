import { useState } from "react";
import { combineClasses } from "../../utils/utils";
import classes from './Search.module.scss';
import SearchArticleCard from "../ArticleCards/SearchArticleCard";
import { ARTICLES_LIST } from '../../../BLOG_CONSTANTS/_ARTICLES_LIST';
import { XIcon } from '@heroicons/react/outline'

interface ISearch {
    closeSearch: () => void
}
const Search = ({ closeSearch }: ISearch) => {
    const [searchStr, setSearchStr] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const handleSearch = () => {
        const data = [...ARTICLES_LIST];
        const results = data.filter((article) => (article.preview.tags.split(',').join().indexOf(searchStr) >= 0
            || article.preview.articleTitle.indexOf(searchStr) >= 0)
        );
        setSearchResults(results)
        console.log(searchResults);

    }

    return (
        <div className={combineClasses('bg-slate-100 text-black dark:bg-slate-900 dark:text-white', classes?.search_container)}>
            <div className="container mx-auto">
                <div className="px-3">
                    <div className='flex justify-between items-center md:pt-10 pt-5'>
                        <h1 className={'text-[45px] font-bold'}>Search</h1>
                        <button name="search-button" type="button" className={classes.search_close_icon} onClick={closeSearch}>
                            <XIcon className='text-slate-800 dark:text-white text-[20px]' />
                        </button>
                    </div>
                    <div className="mb-[40px] mt-3">
                        <input
                            className='text-[20px] w-full bg-inherit border-b border-gray-400 p-2 dark:text-white text-black'
                            placeholder="Enter keywords and seperate with commas"
                            value={searchStr}
                            onChange={(e) => setSearchStr(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                </div>

                {searchResults?.length > 0 && <div className='flex flex-wrap'>
                    {
                        searchResults?.length > 0 && searchResults?.map((article, i) => (
                            <SearchArticleCard article={article.preview} key={i} path={article.path} />
                        ))
                    }
                </div>}

            </div>
        </div>
    )
};

export default Search;