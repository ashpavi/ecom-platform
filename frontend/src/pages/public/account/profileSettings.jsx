export default function ProfileSettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Profile Settings
      </h2>

      <div className="space-y-6">

        <div>
          <label className="block text-sm mb-2">Full Name</label>
          <input className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-2">Email</label>
          <input className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-2">Change Password</label>
          <input
            type="password"
            placeholder="New Password"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Save Changes
        </button>

      </div>
    </div>
  );
}
