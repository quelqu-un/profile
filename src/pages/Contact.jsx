import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
//import  Fox from "../models/Fox";
//import  Rasengan  from "../models/Rasengan";
import Robot from "../models/Robot"
import useAlert from "../hooks/useAlert";
import Loader  from "../components/Loader";
import Alert from "../components/Alert";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");


  const rasenganRef = useRef();

  

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };
//rig|rigAction.001

//AnimationAction
  const handleFocus = () => setCurrentAnimation("rig|rigAction.001");
  const handleBlur = () => setCurrentAnimation("idle");
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Laura",
          from_email: form.email,
          to_email: "lauraffrancine19@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("idle");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setCurrentAnimation("idle");

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };

  return (
    <section className='relative lg:-mt-7 flex lg:flex-row flex-col max-container 'style={{ marginBottom: 2, paddingBottom: 2 }}>
      {alert.show && <Alert {...alert} />}

      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-7 mt-5'
        >
          <label className='text-black-500 font-semibold'>
            Name
            <input
              type='text'
              name='name'
              className='input'
              placeholder='Laura'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input
              type='email'
              name='email'
              className='input'
              placeholder='Laura@gmail.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Your Message
            <textarea
              name='message'
              rows='4'
              className='textarea'
              placeholder='Write your thoughts here...'
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='btn'
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full  lg:h-auto  md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
           <directionalLight position={[1.4, 1.5, 2.2]} intensity={2.5} /> 
          <ambientLight intensity={1} />
          {/* <pointLight position={[50, 20, 10]} intensity={10} /> */}
          <spotLight
            position={[3, 2, 10]}
            angle={0.15}
            penumbra={0.5}
            intensity={2}
          />

          <Suspense fallback={<Loader />}>
            <Robot
              //intervalId = {intervalId}
              
              currentAnimation={currentAnimation}
              position={[0.8, 0.09, 0.01]}
              rotation={[-3, 3.1, 3.2]}
              scale={[3.5,3.5,3.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;