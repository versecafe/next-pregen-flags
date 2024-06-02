import { precomputedFlags } from "@/flags";
import { type FlagValuesType, encrypt, JsonValue } from "@vercel/flags";
import {
  unstable_deserialize as deserialize,
  unstable_generatePermutations as generatePermutations,
} from "@vercel/flags/next";
import { FlagValues } from "@vercel/flags/react";
import { Suspense } from "react";

/** Encrypts flag values and makes the encrypted values accessible to the
 * client for the Vercel Toolbar or anyone with your FLAGS_SECRET */
async function ConfidentialFlagValues({ values }: { values: FlagValuesType }) {
  const encryptedFlagValues = await encrypt(values);
  return <FlagValues values={encryptedFlagValues} />;
}

/** Generates all variants of the pages for the possible flag combinations,
 * or returns an empty array to only create the pages dynamically on request */
export async function generateStaticParams(): Promise<{ code: string }[]> {
  if (process.env.PREGEN_FLAGS === "true") {
    // generate the permutations upfront
    const codes = await generatePermutations(precomputedFlags);
    return codes.map((code) => ({ code }));
  } else {
    // only enable ISR, no pregeneration
    return [];
  }
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { code: string };
}>): Promise<JSX.Element> {
  const values: Record<string, JsonValue> = await deserialize(
    precomputedFlags,
    params.code,
  );

  /* layout applies no modifications besides loading the encrypted
   * flags for the Vercel toolbar with a suspense wrapper */
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <ConfidentialFlagValues values={values} />
      </Suspense>
    </>
  );
}
