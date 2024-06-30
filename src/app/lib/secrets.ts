import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';

const STAGE = process.env.STAGE ? process.env.STAGE : 'production';
const PROJECT = 'leads-landing';
const REGION = 'us-east-1';

export default async function getSecret(secretName: string) {
  if (!secretName) {
    return null;
  }

  const client = new SSMClient({ region: REGION });
  const paramName = `/sst/${PROJECT}/${STAGE}/Secret/${secretName}/value`;
  const paramOptions = {
    Name: paramName,
    WithDecryption: true,
  };
  const command = new GetParameterCommand(paramOptions);
  try {
    const response = await client.send(command);
    if (response.Parameter && response.Parameter.Value) {
      return response.Parameter.Value;
    }

    return null;
  } catch (error) {
    return null;
  }
}
