import joi from "joi"

export const validateId =(id)=>{
  const Schema= joi.object({
    _id: joi.string().required(),

  })
  return Schema.validateAsync(id); 
}
export const validateCategory =(id)=>{
  const Schema= joi.object({
    category: joi.string().required(),

  })
  return Schema.validateAsync(category); 
}
export const validateSearchString =(SearchString)=>{
  const Schema= joi.object({
    SearchString: joi.string().required(),

  })
  return Schema.validateAsync(category); 
}

