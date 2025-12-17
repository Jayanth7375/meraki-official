// const STORAGE_KEY = "staff"; // change only this value

// const [data, setData] = useState([]);
// const [form, setForm] = useState({ name: "" });
// const [editId, setEditId] = useState(null);

// // ✅ LOAD
// useEffect(() => {
//   const saved = localStorage.getItem(STORAGE_KEY);
//   if (saved) setData(JSON.parse(saved));
// }, []);

// // ✅ SAVE
// useEffect(() => {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
// }, [data]);

// // ✅ INPUT HANDLER
// const handleChange = (e) => {
//   setForm({ ...form, [e.target.name]: e.target.value });
// };

// // ✅ ADD / UPDATE
// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (!form.name) return;

//   if (editId) {
//     setData(data.map(item =>
//       item.id === editId ? { ...item, ...form } : item
//     ));
//     setEditId(null);
//   } else {
//     setData([...data, { id: Date.now(), ...form }]);
//   }

//   setForm({ name: "" });
// };

// // ✅ DELETE
// const handleDelete = (id) => {
//   setData(data.filter(item => item.id !== id));
// };

// // ✅ EDIT
// const handleEdit = (item) => {
//   setForm(item);
//   setEditId(item.id);
// };
