import PropTypes from 'prop-types';

/**
 * Form Control Component
 * ...
 */
function FormControl({ 
  type = 'text', 
  title, 
  name, 
  value,
  onChange,
  error = undefined, 
  rows = 3,
  options = [],
  accept = 'image/*' 
}) {

  return (
    <div className="form-control">
      {
        type === 'text' || type === 'number' || type === 'email' ? (
          <label htmlFor={name}>{title}
            <input  type={type}
                    name={name}
                    id={name}
                    value={value} 
                    onChange={(e) => onChange(e)}  />
          </label>
        ) : (
          type === 'textarea' ? (
            <label htmlFor={name}>{title}
              <textarea id={name}
                        name={name}
                        rows={rows}
                        onChange={(e) => onChange(e)} 
                        value={value}></textarea>
            </label>
          ) : (
            type === 'select' ? (
              <label htmlFor={name}>{title}
                <select name={name}
                        id={name}
                        value={value} 
                        onChange={(e) => onChange(e)}>
                    <option key="" value=""></option>
                    {options.map((opt, index) => {
                      return <option key={index} value={opt.value}>{opt.name}</option>;
                    })}
                </select>
              </label>
            ) : (
              <>
                <label htmlFor={name}>{title}</label>
                <input  type="file" 
                        id={name}
                        name={name}
                        accept={accept}
                        onChange={(e) => onChange(e)}  />
              </>
            )
          )
        )
      }
      <p  className="error" 
          style={{ visibility: typeof error === 'string' ? 'visible': 'hidden' }}>
          <span className="md-icon">error</span> {error}
      </p>
    </div>
  );
}
FormControl.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'email', 'textarea', 'select', 'file']),
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.object ]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  rows: PropTypes.string, // textarea
  options: PropTypes.array, // select
  accept: PropTypes.string, // file inputs
}




/**
 * Module Exports
 */
export default FormControl;