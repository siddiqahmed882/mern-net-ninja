import { useState } from 'react';

const Register = () => {
  const [formData, setformData] = useState({ email: '', password: '' });

  /**
   * @desc update the formData
   * @param {import(React).ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    setformData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * @desc submit the form
   * @param {import('react').FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' value={formData['email']} onChange={handleChange} />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' value={formData['password']} onChange={handleChange} />
      </div>
      <button>Register</button>
    </form>
  );
};

export default Register;
