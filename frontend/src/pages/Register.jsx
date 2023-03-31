import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRegisterHook from '../hooks/useRegisterHook';
import useAuthContext from '../hooks/useAuthContext';

const Register = () => {
  const [formData, setformData] = useState({ email: '', password: '' });
  const { isLoading, error, register } = useRegisterHook();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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

    await register(formData);
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
      <button disabled={isLoading}>Register</button>
      {error ? <p className='error'>{error}</p> : null}
    </form>
  );
};

export default Register;
