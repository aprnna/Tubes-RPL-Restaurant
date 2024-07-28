"use client";
import { useCallback, useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast } from "react-toastify";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("users")
        .select(`full_name, age, role`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setAge(data.age);
        setRole(data.role);
      }
    } catch (error) {
      toast.error("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    age,
    fullname,
  }: {
    age: number | null;
    fullname: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("users").upsert({
        id: user?.id as string,
        full_name: fullname,
        age: age,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <Input
          disabled
          id="email"
          label="Email"
          type="text"
          value={user?.email}
        />
      </div>
      <div>
        <Input
          label="Full Name"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <Input
          label="Age"
          type="number"
          value={age?.toString() || ""}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
      </div>
      <div>
        <Input
          disabled
          label="Role"
          type="text"
          value={role || ""}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <div>
        <Button
          className="button primary block"
          color="primary"
          disabled={loading}
          onClick={() => updateProfile({ fullname, age })}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </div>

      <div>
        <form action="/api/auth/logout" method="post">
          <Button className="button block" color="danger" type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
