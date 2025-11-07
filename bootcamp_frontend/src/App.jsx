import { Routes, Route } from 'react-router-dom';
import Home from './pages/Dashboard/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Dashboard/Profile';
import Tests from './pages/Dashboard/Tests';
import Weeks from './pages/Dashboard/Weeks';
import Announcements from './pages/Dashboard/Announcements';
import StudentDetails from './pages/Admin/StudentDetails';
import AdminProfile from './components/AdminProfile.jsx';


import Overview from './pages/Admin/Overview';
import ManageStudents from './pages/Admin/ManageStudents';
import ManageWeeks from './pages/Admin/ManageWeeks';
import ManageAnnouncements from './pages/Admin/ManageAnnouncements ';
import ManageTests from './pages/Admin/ManageTests.jsx';
import ReviewSubmissions from './pages/Admin/ReviewSubmissions';
import ContactInbox from './pages/Admin/ContactInbox';
import SubmitProject from './pages/Dashboard/SubmitProject'; // Adjust path if needed

import Landing from './pages/Landing'; // ⬅️ Add this



function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Landing />} /> {/* ✅ Landing page as default */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student dashboard */}
      <Route path="/dashboard/home" element={<Home />} /> {/* 👈 Add this line */}
      <Route path="/submit" element={<SubmitProject />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/tests" element={<Tests />} />
      <Route path="/weeks" element={<Weeks />} />
      <Route path="/announcements" element={<Announcements />} />

      {/* Admin dashboard */}
      <Route path="/admin" element={<Overview />} />
      <Route path="/admin/students" element={<ManageStudents />} />
      <Route path="/admin/students/:id" element={<StudentDetails />} />
      <Route path="/admin/announcements" element={<ManageAnnouncements />} />
      <Route path="/admin/tests" element={<ManageTests />} />
      <Route path="/admin/profile" element={<AdminProfile />} />

      <Route path="/admin/weeks" element={<ManageWeeks />} />
      <Route path="/admin/submissions" element={<ReviewSubmissions />} />
      <Route path="/admin/contact" element={<ContactInbox />} />
    </Routes>
  );
}

export default App;
