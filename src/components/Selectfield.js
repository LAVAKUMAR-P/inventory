import React from 'react'
import { ErrorMessage, useField } from 'formik';

function Selectfield({ label, ...props }) {
        const [field, meta] = useField(props);
        return (
          <div>
            <label htmlFor={field.name}>{label}</label><br/>
            <select
              className={`L-input ${meta.touched && meta.error &&  'L-input2'}`}
              {...field} {...props}
            > 
                 <option >select</option>
                <option value="true">true</option>
                <option value="false">false</option>
                </select>
            <ErrorMessage component="div" name={field.name} className="error" />
          </div>
          
        )
}

export default Selectfield
