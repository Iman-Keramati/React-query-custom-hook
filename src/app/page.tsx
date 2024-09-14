"use client";
import LoadingAndError from "./components/LoadingAndError";
import useGetQuery from "./Hook/useGetQuery";
import usePostMutation from "./Hook/usePostMutation";

export default function Home() {
  const fakeApi: string = "https://fakestoreapi.com/products";
  const key: string = "products";

  const { data, isLoading, isError } = useGetQuery(fakeApi, key);

  const mutation = usePostMutation(fakeApi, key);

  if (mutation.isSuccess) {
    data.push(mutation.variables);
  }

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        React Query
      </div>
      <LoadingAndError isError={isError} isLoading={isLoading}>
        <ul>
          {data &&
            data.map((i: { title: string }, idx: number) => (
              <li key={idx}>{i.title}</li>
            ))}
        </ul>
      </LoadingAndError>

      {mutation.isPending ? <p>adding new product ....</p> : null}
      <button
        className="rounded-lg bg-green-600 text-[18px] scale-[1] text-white p-4 m-5 hover:scale-[0.9] transition-all duration-500 hover:bg-green-800"
        onClick={() => {
          mutation.mutate({
            id: Math.random(),
            title: "New Product" + Math.random(),
          });
        }}
      >
        Add a product
      </button>
    </>
  );
}
