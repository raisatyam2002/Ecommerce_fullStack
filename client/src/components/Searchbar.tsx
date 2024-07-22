import { Input, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSearch } from "../context/searchContext";
const { Search } = Input;

const SearchBar = ({ keyWord, setKeyWord }: any) => {
  //   const [products, setProducts] = useState<any>([]);
  const navigate = useNavigate();
  const [state, setState] = useSearch();
  const onSearch = async () => {
    if (!keyWord) {
      toast("type a word to search");
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/search/${keyWord}`
      );
      if (data.success) {
        toast.success("search successful");

        setState({ products: data.products });

        // Navigate after a short delay to allow state to update
        setTimeout(() => {
          navigate("/search");
        }, 500);

        // navigate("/search");
      } else {
        toast.error("error1 ");
      }
    } catch (error) {
      console.log(error);
      toast.error("error 2 while seatrchng product");
    }
  };
  return (
    <Space direction="vertical">
      <Search
        placeholder="Write a word to search"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        value={keyWord}
        onChange={(e) => {
          setKeyWord(e.target.value);
        }}
        style={{ width: "800px" }} // Set your desired width here
      />
    </Space>
  );
};

export default SearchBar;
