import React, { useState } from 'react';
import supabase from '../../Client';
import { v4 as uuidv4 } from 'uuid';


function SellForm({ user, categories, conditions, sizes, errors, session }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState('');



const handleSubmit = async (event) => {
  event.preventDefault();

  // Create an object representing the form data
  const formData = {
    name,
    price,
    category,
    brand,
    model,
    size,
    condition,
    description,
    imageUrl,
    sellerId: user.id
  };

  // Make a POST request to your API
  const response = await fetch('/api/products/sell', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (response.ok) {
    // If the request was successful, clear the form
    setName('');
    setPrice('');
    setCategory('');
    setBrand('');
    setModel('');
    setSize('');
    setCondition('');
    setDescription('');
    setImageUrl('');
  } else {
    // If there was an error, you can handle it here
    console.error('Error:', response);
  }
};

// Add this line at the beginning of your component
const [isImageUploaded, setIsImageUploaded] = useState(false);


// Modify your handleFileUpload function like this
const handleFileUpload = async (event) => {
  event.preventDefault();

  // Get the file from the file input field
  const selectedFile = event.target.files[0];
  setFile(selectedFile);
  console.log(file);

  // Define the path where the file will be stored
  const filePath = user.id + "/" + uuidv4();
  console.log(filePath);

  // Upload the file to Supabase Storage
  const { error } = await supabase.storage
    .from('uploads')
    .upload(filePath, selectedFile, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error uploading file:', error);
  } else {
    console.log('File uploaded successfully');

    // Get the URL of the uploaded file
    const { publicURL, error: urlError } = await supabase.storage
    .from('uploads')
    .getPublicUrl(filePath);

    if (urlError) {
      console.error('Error getting file URL:', urlError);
    } else {

    let totalUrl = "https://olssegxvsjfzoxdqounk.supabase.co/storage/v1/object/public/uploads/" + filePath;
    console.log("total url: " + totalUrl);
      // Update the imageUrl state with the URL of the uploaded file
      setImageUrl(totalUrl);
      // Set isImageUploaded to true
      setIsImageUploaded(true);
    }
  }
};



  return (
    <div id="SubmitProductContainer">
      <div className="submit-section">
        <div className="submit-info">
          <h1>Sell a Product</h1>

          {/*{ errors && errors.length > 0 && (
            <div className="errors">
              {errors.map((error, index) => (
                <p key={index}><em>{error}</em></p>
              ))}
            </div>
          )}*/}

        <form id="uploadForm" onSubmit={handleFileUpload}>
            <input type="hidden" name="MAX_FILE_SIZE" value="1048576" />
            <div id="infoItem" className="info-item">
                <label id="imageLabel" htmlFor="image">Product Image</label>
                <input style={{display: 'none'}} value='' type="file" id="image" name="image" onChange={handleFileUpload} />
                {isImageUploaded ? (
                <>
                <label htmlFor="image" className="uploadButton">Upload another image</label>
                <img src={isImageUploaded ? imageUrl : ''} alt="Uploaded content" />
                </>
                ) : (
                <label htmlFor="image" className="uploadButton">Upload</label>
                )}
            </div>
        </form>

          <form id="productForm" onSubmit={handleSubmit}>
            <div className="info-item">
              <label htmlFor="name">NAME</label>
              <div className="relativeCounterContainer">
                <input type="text" id="name" name="name" maxLength="50" value={name} onChange={(e) => setName(e.target.value)} />
                <p id="nameCounter" className="counter">{`${name.length} / 50`}</p>
              </div>
            </div>

            <div className="info-item">
              <label htmlFor="price">PRICE ($)</label>
              <input type="number" id="price" name="price" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="info-item">
              <label htmlFor="category">CATEGORY</label>
              <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((category, index) => (
                  <option key={index} value={category.replace(' ', '')}>{category}</option>
                ))}
              </select>
            </div>

            <div className="info-item">
              <label htmlFor="brand">BRAND</label>
              <div className="relativeCounterContainer">
                <input type="text" id="brand" name="brand" maxLength="50" value={brand} onChange={(e) => setBrand(e.target.value)} />
                <p id="brandCounter" className="counter">{`${brand.length} / 50`}</p>
              </div>
            </div>

            <div className="info-item">
              <label htmlFor="model">MODEL</label>
              <div className="relativeCounterContainer">
                <input type="text" id="model" name="model" maxLength="50" value={model} onChange={(e) => setModel(e.target.value)} />
                <p id="modelCounter" className="counter">{`${model.length} / 50`}</p>
              </div>
            </div>

            <div className="info-item">
              <label htmlFor="size">SIZE</label>
              <div className="relativeCounterContainer">
                <select id="size" name="size" value={size} onChange={(e) => setSize(e.target.value)}>
                  {sizes.map((size, index) => (
                    <option key={index} value={size.replace(' ', '')}>{size}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="info-item">
              <label htmlFor="condition">CONDITION</label>
              <select id="condition" name="condition" value={condition} onChange={(e) => setCondition(e.target.value)}>
                {conditions.map((condition, index) => (
                  <option key={index} value={condition}>{condition}</option>
                ))}
              </select>
            </div>

            <div className="info-item">
              <label htmlFor="description">DESCRIPTION</label>
              <div className="relativeCounterContainer">
                <textarea id="description" maxLength="500" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <p id="descriptionCounter" className="counter">{`${description.length} / 500`}</p>
              </div>
            </div>

            <input type="hidden" id="SellerID" name="sellerId" value={user.id} />
            <input type="hidden" id="imageUrl" name="imageUrl" value={imageUrl} />

            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellForm;