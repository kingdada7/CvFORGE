import React from 'react'

const PersonalInformationForm = () => {
  return (
       <section className="bg-panel rounded-lg p-4 mb-[15px] shadow-[inset_0_0_0_1px_#e6eaff]">
            <CardHeading icon="♙" title="Personal Information" />

            <div className="grid grid-cols-2 gap-3 gap-x-[10px] max-[430px]:grid-cols-1">
              <label className="text-[#66728a] font-mono text-[9px]">
                Full Name
                <input
                  value={profile.name}
                  onChange={(e) => updateProfile("name", e.target.value)}
                  placeholder="Your full name"
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>

              <label className="text-[#66728a] font-mono text-[9px]">
                Headline
                <input
                  value={profile.headline}
                  onChange={(e) => updateProfile("headline", e.target.value)}
                  placeholder="e.g. Frontend Developer"
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>

              <label className="text-[#66728a] font-mono text-[9px]">
                Email
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile("email", e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>

              <label className="text-[#66728a] font-mono text-[9px]">
                Phone
                <input
                  value={profile.phone}
                  onChange={(e) => updateProfile("phone", e.target.value)}
                  placeholder="+234..."
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>

              <label className="text-[#66728a] font-mono text-[9px]">
                Location
                <input
                  value={profile.location}
                  onChange={(e) => updateProfile("location", e.target.value)}
                  placeholder="City, Country"
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>

              <label className="text-[#66728a] font-mono text-[9px]">
                Website
                <input
                  value={profile.website}
                  onChange={(e) => updateProfile("website", e.target.value)}
                  placeholder="yourwebsite.com"
                  className="block w-full mt-[5px] border border-[#dde3f0] bg-white rounded-[4px] text-ink px-[9px] py-2 outline-none text-[12px] focus:border-[#7578f0]"
                />
              </label>
            </div>
          </section>
  )
}

export default PersonalInformationForm
