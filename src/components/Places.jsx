import Image from "next/image";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DeleteConfirmation from "@/components/DeleteConfirmation";

export default function Places({
  title,
  places,
  fallbackText,
  onSelectPlace,
  isSelectedPlace,
  handleRemovePlace,
  handleStartDeletePlace,
}) {
  return (
    <Dialog>
      <section className="w-full my-10 p-5 bg-sky-900 border-1 border-sky-700 inset-shadow-sm inset-shadow-blue-900 rounded-md">
        <h2 className="text-3xl text-center pb-5">{title}</h2>
        {places.length === 0 && (
          <p className="text-lg text-center">{fallbackText}</p>
        )}
        {places.length > 0 && (
          <ul className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {places.map((place) => (
              <li
                key={place.id}
                className={`relative p-3 border  rounded-sm ${isSelectedPlace ? "border-lime-500" : "border-white"}`}
              >
                {!isSelectedPlace ? (
                  <button onClick={() => onSelectPlace(place.id)}>
                    <Image
                      src={place.image.src}
                      alt={place.image.alt}
                      className="rounded-sm"
                    />
                    <h3>{place.title}</h3>
                  </button>
                ) : (
                  <>
                    <Image
                      src={place.image.src}
                      alt={place.image.alt}
                      className="rounded-sm"
                    />
                    <h3>{place.title}</h3>
                  </>
                )}
                {isSelectedPlace && (
                  <DialogTrigger asChild>
                    <button
                      onClick={() => handleStartDeletePlace(place.id)}
                      className="absolute bottom-10 right-5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </DialogTrigger>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      <DeleteConfirmation onConfirm={handleRemovePlace} />
    </Dialog>
  );
}
