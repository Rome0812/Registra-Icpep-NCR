import React from "react";

const GoldTemplate = ({
  event,
  organizers = [],
  editing,
  handleOrganizerChange,
  handleOrganizerSignature,
}) => {
  return (
    <div
      className="relative w-full max-w-4xl mx-auto bg-gradient-to-b from-yellow-50 to-yellow-100 border-4 sm:border-6 lg:border-8 border-yellow-500 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg p-3 sm:p-6 lg:p-8 text-center transition-all duration-300"
      style={{ aspectRatio: "11/8.5" }}
    >
      {/* CERTIFICATE HEADER */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-700 mb-1 sm:mb-2">CERTIFICATE</h1>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-600 mb-3 sm:mb-4 lg:mb-6">
        OF PARTICIPATION
      </h2>

      <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 lg:mb-4">This is proudly presented to</p>

      <p className="text-gray-800 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
        In recognition of their active participation in{" "}
        <span className="font-semibold text-yellow-800">
          {event?.title || "Event Title"}
        </span>{" "}
        held on{" "}
        <span className="font-semibold text-yellow-800">
          {event?.date
            ? new Date(event.date).toLocaleDateString()
            : "MM/DD/YYYY"}
        </span>
        .
      </p>

      {/* ORGANIZERS */}
      <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
        {organizers.map((org, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-32 sm:w-36 md:w-40 lg:w-48 bg-white/70 rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 lg:p-4"
          >
            {/* Signature preview */}
            <div className="h-12 sm:h-14 lg:h-16 flex items-center justify-center">
              {org.signatureFile ? (
                // 🟢 Instant preview from file
                <img
                  src={URL.createObjectURL(org.signatureFile)}
                  alt="signature"
                  className="h-10 sm:h-12 lg:h-14 object-contain"
                />
              ) : org.signature ? (
                // 🟢 Loaded from Cloudinary
                <img
                  src={org.signature}
                  alt="signature"
                  className="h-10 sm:h-12 lg:h-14 object-contain"
                />
              ) : (
                // 🟠 Placeholder
                <span className="text-gray-400 italic text-xs sm:text-sm">
                  No signature
                </span>
              )}
            </div>

            <div className="border-t border-yellow-600 w-16 sm:w-20 lg:w-24 my-1 sm:my-2"></div>

            {/* Organizer Name */}
            {editing ? (
              <input
                type="text"
                value={org.name}
                onChange={(e) =>
                  handleOrganizerChange(index, "name", e.target.value)
                }
                placeholder="Organizer Name"
                className="border border-yellow-400 rounded-md text-center p-1 text-xs sm:text-sm mb-1 sm:mb-2 w-full focus:outline-none"
              />
            ) : (
              <p className="font-semibold text-yellow-800 text-xs sm:text-sm lg:text-base text-center">{org.name}</p>
            )}

            {/* Organizer Label */}
            {editing ? (
              <input
                type="text"
                value={org.label}
                onChange={(e) =>
                  handleOrganizerChange(index, "label", e.target.value)
                }
                placeholder="Organizer Role"
                className="border border-yellow-400 rounded-md text-center p-1 text-xs sm:text-sm mb-1 sm:mb-2 w-full focus:outline-none"
              />
            ) : (
              <p className="text-gray-700 text-xs sm:text-sm text-center">{org.label}</p>
            )}

            {/* Upload Button */}
            {editing && (
              <div className="flex flex-col items-center mt-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleOrganizerSignature(index, e.target.files[0])
                  }
                  className="text-xs w-full"
                />
                {org.signatureFile && (
                  <button
                    type="button"
                    onClick={() =>
                      handleOrganizerChange(index, "signatureFile", null)
                    }
                    className="bg-red-500 text-white text-xs rounded px-1 sm:px-2 py-1 mt-1 hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoldTemplate;
