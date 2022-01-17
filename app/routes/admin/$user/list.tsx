import { ActionFunction, json, useCatch } from 'remix';
import { LoaderFunction, useLoaderData } from 'remix';
import BlogList from '~/components/blog/BlogList';

import { getVal, gun, loadProject, } from '../../../lib/GunDb';
import Display from '~/components/DisplayHeading';
import React from 'react';
import { decrypt } from '~/lib/GunDb/GunCtx';

export let loader: LoaderFunction = async ({ request, params }) => {

let list = await loadProject(request, params);
return list
};

///////////////
export let action: ActionFunction = async ({ request }) => {
  //action function
  return null;
};
///////////////
export default function List() {
  let data = useLoaderData();
console.log(data);

  return (
    <>
    {/* <p>{JSON.parse(JSON.stringify())}</p> */}
      <BlogList  alias={''} />
    </>
  );
}
export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 403:
    case 404:
      return (
        <div className="min-h-screen py-4 flex flex-col justify-center items-center">
          <Display
            title={`${caught.status}`}
            titleColor="white"
            span={`${caught.statusText}`}
            spanColor="pink-500"
            description={`${caught.statusText}`}
          />
        </div>
      );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="min-h-screen py-4 flex flex-col justify-center items-center">
      <Display
        title="Error:"
        titleColor="white"
        span={error.message}
        spanColor="red-500"
        description={`${error}`}
      />
    </div>
  );
}




