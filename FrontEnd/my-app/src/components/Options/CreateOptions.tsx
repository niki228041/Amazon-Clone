import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { apiOptionsSlice } from "../../features/user/apiOptionsSlice";
import { title } from "process";
import { Variant } from "react-bootstrap/esm/types";



interface createOptions{
  title:string,
  variants:createVariant[]
}

interface createVariant{
  title:string,
}

const CreateOptions = () => {
  const params = useParams();
  console.log(params.categoryId);

  var navigate = useNavigate();

  var [createOptions,{}] = apiOptionsSlice.useCreateOptionsMutation();



  const [divContent, setDivContent] = useState<JSX.Element[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [inputIds, setInputIds] = useState<string[]>([]);

  const addElement = () => {
    var id = uuidv4();
    const newElement = (
      <div key={id}>
        <p>Variant </p>
        <div className="flex">
          <input
            id={id}
            autoComplete="variant"
            required
            className="p-2 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            className="w-10 self-center h-full"
            onClick={() => handleDeleteNewVariant(id)}
          >
            -
          </button>
        </div>
      </div>
    );
    setDivContent(prevContent => [...prevContent, newElement]);
    setInputIds(prevContent => [...prevContent, id] );
  };

  const handleDeleteNewVariant = (id: string) => {
    setDivContent(prevContent => prevContent.filter(element => element.key !== id));
    setInputIds(prevContent => prevContent.filter(element => element !== id));
  };

  const handleCreate = (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    var curentData = new FormData(data.currentTarget);


    var request:createOptions = {title:"",variants:[]};
    for (let index = 0; index < inputIds.length; index++) {
      var tmp:any = document.getElementById(inputIds[index]);
      var Variant:createVariant = {title:tmp.value};
      request.variants.push(Variant);
    }

    request.title = curentData?.get("Title")?.toString()!;

    createOptions(request);

    navigate("/admin");

    console.log(request);
  };

  const handelCreateNewVariant=()=>{
    addElement();
    console.log(inputValues);
  }

    

    return (
      <>
        <div className=" min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-500/40">
      <div className=" bg-slate-50 p-10 w-4/12 mx-auto">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           CREATE OPTIONS
          </h2>
        </div>

        <div className="mt-10 ">
          <form onSubmit={handleCreate}>
            <div className="flex">
              <div className=" w-full  mr-1">
                <label htmlFor="Title" className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="Title"
                    name="Title"
                    autoComplete="Title"
                    required
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
            </div>



            <div className="flex">
              <div className=" w-full mr-1">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Variants
                </label>
                <div id="variants" className="mt-2 flex">
                  <button className="w-10" onClick={()=>handelCreateNewVariant()}>
                    +
                  </button>
                  
                </div>
                {divContent}
              </div>
            </div>



            <div>
              <button
                type="submit"
                className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create
              </button>
            </div>
            </form>
            </div>
          </div>
      </div>
      </>
    )
  }
  
  export default CreateOptions