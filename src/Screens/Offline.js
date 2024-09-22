import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Assets/main.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Offline  ()  {
const [getAllData, setGetAllData]  = useState([]);
const [searchData, setSearchData] = useState('');
const [deleteCategory, setDeleteCategory]  = useState({
    MAIN_CAT_ID: "",
    MAIN_CAT_NAME: ""
});

const [editCategory, setEditCategory]  = useState({
    MAIN_CAT_ID: "",
    MAIN_CAT_NAME: ""
});
const [displayForm, setDisplayForm] = useState(false)
const [displayEditForm, setDisplayEditForm] = useState(false)
const [confirmationPopup, setConfirmationPopup] = useState(false)
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(8); 


// Display Category Form
const dispCategoryform = (e) =>{
e.preventDefault()
setDisplayForm(!displayForm)
}
// Adding Main Catagory
const Adddata = async (e) => {
    e.preventDefault();
    const Addeddata =  document.getElementById('data').value
    const url = 'https://lubosoftdev.com/api/nst_back_end_code/catagory.php?run=insert_main_catagory';
    const data = {
      deviceType: 'web',
      username: 'Dhineshbabu',
      cat_name: Addeddata
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if(response.data.status === "success")
      {
        setDisplayForm(!displayForm)
        GetCategoryApi();
        toast.success("Added Successfully");
      }
    } catch (error) {
      console.error('Error posting data:', error.response ? error.response.data : error.message);
    }
}

// Update Main Category
const Updatedata = async (e) =>{
    e.preventDefault();
    const Addeddata =  document.getElementById('editdata').value
    const url = 'https://lubosoftdev.com/api/nst_back_end_code/catagory.php?run=update_main_catagory';
    const data = {
      deviceType: 'web',
      username: 'Dhineshbabu',
      cat_name: Addeddata,
      main_cat_id:editCategory.MAIN_CAT_ID,
      deleted_flg: "U"
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if(response.data.status === "success")
      {
          setDisplayEditForm(!displayEditForm)
        GetCategoryApi();
        toast.success("Updated Successfully");
      }
    } catch (error) {
      console.error('Error posting data:', error.response ? error.response.data : error.message);
    }
}

// Getting Main Catagory
const GetCategoryApi  = async () => {
    const url = 'https://lubosoftdev.com/api/nst_back_end_code/catagory.php?run=get_all_main_cat'; // Replace with your API endpoint
    const data = {
      deviceType: 'web',
      username: 'Dhineshbabu'
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setGetAllData(response.data.message)
    } catch (error) {
      console.error('Error posting data:', error.response ? error.response.data : error.message);
    }
  };

// Display Edit Category
const dispEdit = async (e, CAT_ID, CAT_Name) =>{
e.preventDefault();
setDisplayEditForm(!displayEditForm)
setEditCategory({
    MAIN_CAT_ID: CAT_ID,
    MAIN_CAT_NAME: CAT_Name
        })
}

// Close Edit category Form
const closedisplayEditForm = (e) =>{
    e.preventDefault(); 
    setDisplayEditForm(!displayEditForm)
setEditCategory({
    MAIN_CAT_ID: "",
    MAIN_CAT_NAME: ""
        })
}

// Display Confirmation popup
const dispConfirmationPopup=(e, CAT_ID, CAT_Name)=>{
    e.preventDefault();
        setConfirmationPopup(!confirmationPopup)
        setDeleteCategory({
    MAIN_CAT_ID: CAT_ID,
    MAIN_CAT_NAME: CAT_Name
        })
}

// Close Confirmation popup
const closeConfirmationPopup=(e)=>{
    e.preventDefault();
        setConfirmationPopup(!confirmationPopup)
        setDeleteCategory({
    MAIN_CAT_ID: "",
    MAIN_CAT_NAME: ""
        })
}


// Delete Main Catagory
const dispDelete = async (e, CAT_ID, CAT_Name) =>{

   
    
    e.preventDefault();

    
    const url = ' https://lubosoftdev.com/api/nst_back_end_code/catagory.php?run=update_main_catagory';
    const data = {
      deviceType: 'web',
      username: 'Dhineshbabu',
      cat_name: CAT_Name,
      main_cat_id: CAT_ID,
      deleted_flg: "D"
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.data.status === "success")
      {
        setConfirmationPopup(!confirmationPopup)
        GetCategoryApi();
        toast.success("Deleted Successfully");
      }
  
    } catch (error) {
      console.error('Error posting data:', error.response ? error.response.data : error.message);
    }
    }

useEffect(() =>{
    GetCategoryApi();
}, [])

// Search
const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  // Search
  const filteredItems = getAllData.filter(item =>
    item.MAIN_CAT_NAME.toLowerCase().includes(searchData.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);


    return(
        <>
        <div>
          {/* Toastcontainer */}
            <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

<div className="TableContainer">
<center>
<h1 className="text-styled">Add Main Category <span onClick={(e) => dispCategoryform(e)}> <FontAwesomeIcon icon={faPlusCircle} className="icon" /></span></h1>
</center>
<div className="searchcontainer">
<input
        type="text"
        className="form-control"
        id="searchdata"
        name="searchdata"
        placeholder="Search Category..."
        value={searchData}
        onChange={handleChange}
        required
        autocomplete="off"
        maxLength={50}
      />
</div>
{/* Display Edit Category */}
{displayEditForm ? 
<div className="overlay">
    <div className="popup">
        <button className="close-btn" onClick={(e) => closedisplayEditForm(e)}>X</button>
        <h4>Update Main Category</h4>
        <form onSubmit={(e) => Updatedata(e)}>
            <div className="form-group">
                <input type="text" className="form-control" id="editdata" name="editdata" defaultValue={editCategory.MAIN_CAT_NAME} placeholder="Main Category" required autocomplete="off" maxLength={50}/>
            </div>
            <div className="button-group">
                <button type="submit" className="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
</div> : null}
    {/* Display Add Main Category */}
    {displayForm ? 
<div className="overlay">
    <div className="popup">
        <button className="close-btn" onClick={(e) => dispCategoryform(e)}>X</button>
        <h4>Insert Main Category</h4>
        <form onSubmit={(e) => Adddata(e)}>
            <div className="form-group">
                <input type="text" className="form-control" id="data" name="data" placeholder="Main Category" required autocomplete="off" maxLength={50} />
            </div>
            <div className="button-group">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="reset" className="btn btn-secondary">Cancel</button>
            </div>
        </form>
    </div>
</div>

        : null
    }

{/* Display Confirm popup category */}
{
        confirmationPopup ? 
<div className="overlay">
    <div className="popup">
        <button className="close-btn" onClick={(e) => closeConfirmationPopup(e)}>X</button>
        <h4>Are you sure want to delete this {deleteCategory.MAIN_CAT_NAME} Category?</h4>
        <form>
            <div className="button-group">
                <button type="submit" className="btn btn-primary" onClick={(e) =>dispDelete(e, deleteCategory.MAIN_CAT_ID, deleteCategory.MAIN_CAT_NAME)}>Ok</button>
                <button type="reset" className="btn btn-secondary" onClick={(e) => closeConfirmationPopup(e)}>Cancel</button>
            </div>
        </form>
    </div>
</div>

        : null
    }

{/* Table */}
<table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Main Category</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {currentItems.map((d) => (
      <tr key={d.MAIN_CAT_ID}>
        <td>{d.MAIN_CAT_NAME}</td>
        <td>
          <span onClick={(e) => dispEdit(e, d.MAIN_CAT_ID, d.MAIN_CAT_NAME)}>
            <FontAwesomeIcon icon={faEdit} className="trashicon" />
          </span> 
          / 
          <span onClick={(e) => dispConfirmationPopup(e, d.MAIN_CAT_ID, d.MAIN_CAT_NAME)}>
            <FontAwesomeIcon icon={faTrash} className="deleteicon" />
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>

{/* Pagination */}
<div className="pagination">
                        <button className="pagination-button" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}>
                                {index + 1}
                            </button>
                        ))}
                        <button className="pagination-button" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
                    </div>
</div>
        </div>
        </>
    );
    
};
export default Offline