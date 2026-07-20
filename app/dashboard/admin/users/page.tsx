"use client";

import React, { useEffect, useState } from "react";
import { apiClient } from "@/services/apiClient";
import { toast } from "react-hot-toast";
import { Loader2, Shield, UserX, UserCheck, Trash2, Search, Settings } from "lucide-react";
import { SafeUser } from "@/providers/AuthProvider";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get<{ success: boolean; data: SafeUser[] }>("/admin/users");
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      console.error("Failed to load users", err);
      toast.error("Failed to load users list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = async (id: string, action: "promote" | "demote" | "suspend" | "activate") => {
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;

    setActionLoadingId(id);
    const loadingId = toast.loading(`Processing ${action}...`);
    try {
      const response = await apiClient.patch<{ success: boolean; message: string; data: { user: SafeUser } }>(
        `/admin/users/${id}`,
        { action }
      );
      if (response.data.success) {
        toast.success(response.data.message || `User successfully updated.`, { id: loadingId });
        // Update user locally
        setUsers((prev) =>
          prev.map((u) => {
            if (u._id === id) {
              if (action === "promote") return { ...u, role: "admin" };
              if (action === "demote") return { ...u, role: "user" };
              if (action === "suspend") return { ...u, isActive: false };
              if (action === "activate") return { ...u, isActive: true };
            }
            return u;
          })
        );
      }
    } catch (err) {
      console.error(`Failed to ${action} user`, err);
      toast.error(`Failed to execute ${action}`, { id: loadingId });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to completely delete this user? This action cannot be undone.")) return;

    setActionLoadingId(id);
    const loadingId = toast.loading("Deleting user...");
    try {
      const response = await apiClient.delete<{ success: boolean; message: string }>(`/admin/users/${id}`);
      if (response.data.success) {
        toast.success("User deleted successfully.", { id: loadingId });
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete user", err);
      toast.error("Failed to delete user", { id: loadingId });
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredUsers = users.filter((u) => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          User Management
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-text" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm bg-white dark:bg-[#0c1220] border border-border-color dark:border-slate-800/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-dark-text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#0c1220] rounded-xl border border-border-color dark:border-slate-800/60 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-[#090d16]/50 text-secondary-text text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color dark:divide-slate-800/60">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-secondary-text">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-dark-text">{user.name}</span>
                          <span className="text-xs text-secondary-text">{user.email}</span>
                          <span className="text-[10px] text-secondary-text mt-0.5">Provider: {user.provider}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-red-500/10 text-red-600 dark:text-red-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Suspended
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.role === "admin" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-primary/10 text-primary">
                            <Shield className="h-3 w-3" />
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-secondary-text">
                            User
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {user.role === "admin" ? (
                            <button
                              onClick={() => handleAction(user._id, "demote")}
                              disabled={actionLoadingId === user._id}
                              title="Demote to User"
                              className="p-1.5 rounded-lg text-secondary-text hover:bg-orange-500/10 hover:text-orange-500 transition-colors disabled:opacity-50"
                            >
                              <Shield className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAction(user._id, "promote")}
                              disabled={actionLoadingId === user._id}
                              title="Promote to Admin"
                              className="p-1.5 rounded-lg text-secondary-text hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50"
                            >
                              <Settings className="h-4 w-4" />
                            </button>
                          )}

                          {user.isActive ? (
                            <button
                              onClick={() => handleAction(user._id, "suspend")}
                              disabled={actionLoadingId === user._id}
                              title="Suspend User"
                              className="p-1.5 rounded-lg text-secondary-text hover:bg-orange-500/10 hover:text-orange-500 transition-colors disabled:opacity-50"
                            >
                              <UserX className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAction(user._id, "activate")}
                              disabled={actionLoadingId === user._id}
                              title="Activate User"
                              className="p-1.5 rounded-lg text-secondary-text hover:bg-green-500/10 hover:text-green-500 transition-colors disabled:opacity-50"
                            >
                              <UserCheck className="h-4 w-4" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(user._id)}
                            disabled={actionLoadingId === user._id}
                            title="Delete User"
                            className="p-1.5 rounded-lg text-secondary-text hover:bg-red-500/10 hover:text-red-500 transition-colors disabled:opacity-50 ml-1"
                          >
                            {actionLoadingId === user._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
