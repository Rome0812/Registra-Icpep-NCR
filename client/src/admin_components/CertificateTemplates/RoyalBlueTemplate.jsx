import React from "react";

const RoyalBlueTemplate = ({
  event,
  organizers = [],
  editing,
  handleOrganizerChange,
  handleOrganizerSignature,
}) => {
  return (
    <div
      className="relative w-full max-w-4xl mx-auto bg-gradient-to-b from-[#f7faff] to-[#e6efff] border-4 sm:border-6 lg:border-8 border-[#1e3a8a] rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl p-3 sm:p-6 lg:p-8 text-center transition-all duration-300"
      style={{ aspectRatio: "11/8.5" }}
    >
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-1 sm:mb-2 font-serif tracking-wide">
        CERTIFICATE
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1d4ed8] mb-3 sm:mb-4 lg:mb-6 font-serif">
        OF RECOGNITION
      </h2>

      <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 lg:mb-4">
        This certificate is proudly presented to
      </p>

      <p className="text-gray-800 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
        In appreciation of outstanding performance and participation in{" "}
        <span className="font-semibold text-[#1e3a8a]">
          {event?.title || "Event Title"}
        </span>{" "}
        held on{" "}
        <span className="font-semibold text-[#1e3a8a]">
          {event?.date
            ? new Date(event.date).toLocaleDateString()
            : "MM/DD/YYYY"}
        </span>
        .
      </p>

      {/* Organizer Section */}
      <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
        {organizers.map((org, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-32 sm:w-36 md:w-40 lg:w-48 bg-white/70 rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 lg:p-4"
          >
            {/* Signature Preview */}
            <div className="h-12 sm:h-14 lg:h-16 flex items-center justify-center">
              {org.signatureFile ? (
                <img
                  src={URL.createObjectURL(org.signatureFile)}
                  alt="signature"
                  className="h-10 sm:h-12 lg:h-14 object-contain"
                />
              ) : org.signature ? (
                <img
                  src={org.signature}
                  alt="signature"
                  className="h-10 sm:h-12 lg:h-14 object-contain"
                />
              ) : (
                <span className="text-gray-400 italic text-xs sm:text-sm">
                  No signature
                </span>
              )}
            </div>

            <div className="border-t border-[#1e3a8a] w-16 sm:w-20 lg:w-24 my-1 sm:my-2"></div>

            {/* Organizer Name */}
            {editing ? (
              <input
                type="text"
                value={org.name}
                onChange={(e) =>
                  handleOrganizerChange(index, "name", e.target.value)
                }
                placeholder="Organizer Name"
                className="border border-[#1e40af] rounded-md text-center p-1 text-xs sm:text-sm mb-1 sm:mb-2 w-full focus:outline-none"
              />
            ) : (
              <p className="font-semibold text-[#1e3a8a] text-xs sm:text-sm lg:text-base text-center">{org.name}</p>
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
                className="border border-[#1e40af] rounded-md text-center p-1 text-xs sm:text-sm mb-1 sm:mb-2 w-full focus:outline-none"
              />
            ) : (
              <p className="text-gray-700 text-xs sm:text-sm text-center">{org.label}</p>
            )}

            {/* Upload Signature */}
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

export default RoyalBlueTemplate;
