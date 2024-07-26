/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { Input, Button, Avatar } from "antd";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import General from "./General";

const TeamspaceSettingModal = ({ doc, openModal, setOpenModal, children }) => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([
    { email: "john@example.com", name: "John Doe", profilePicture: "https://example.com/john.jpg" },
    { email: "jane@example.com", name: "Jane Smith", profilePicture: "https://example.com/jane.jpg" },
    // Add more members as needed
  ]);

  const handleInvite = () => {
    // Logic to send the invite
    console.log("Invite sent to:", email);
    setInviteModalOpen(false);
    setEmail("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </DialogTrigger>
      <DialogContent className="z-[99999] m-2 gap-0 lg:max-w-2xl md:max-w-xl sm:max-w-lg min-h-[650px]">
        <div className="cursor-default relative z-50">
          <div className="flex h-full w-full py-3 px-4">
            <div className="flex flex-col gap-2 dark:bg-[#202020] bg-white px-4 pb-4 rounded-lg w-full">
              <span className="text-lg text-black mt-2 flex items-start justify-start">
                <div className="flex shrink-0 mr-2 text-[18px]">{doc?.icon}</div>
                <span className="capitalize dark:text-muted-foreground font-semibold">
                  {doc?.title}
                </span>
              </span>
              <hr />
              <Tabs defaultValue="General" className="w-full">
                <TabsList className="bg-transparent w-full flex justify-start">
                  <TabsTrigger value="General">General</TabsTrigger>
                  <TabsTrigger value="Members">Members</TabsTrigger>
                  <TabsTrigger value="Security">Security</TabsTrigger>
                </TabsList>
                <TabsContent value="General">
                  <General doc={doc} />
                </TabsContent>
                <TabsContent value="Members">
                  <div className="flex justify-end mb-4">
                    <Button type="primary" onClick={() => setInviteModalOpen(true)}>
                      Invite Member
                    </Button>
                  </div>
                  <div>
                    {members.map((member, index) => (
                      <div key={index} className="flex items-center gap-4 mb-4">
                        <Avatar src={member.profilePicture} size={40} />
                        <div>
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {inviteModalOpen && (
                    <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
                      <DialogContent>
                        <h3 className="text-lg font-semibold mb-4">Invite Member</h3>
                        <Input
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mb-4"
                        />
                        <Button type="primary" onClick={handleInvite}>
                          Send Invite
                        </Button>
                      </DialogContent>
                    </Dialog>
                  )}
                </TabsContent>
                <TabsContent value="Security">Security</TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamspaceSettingModal;
