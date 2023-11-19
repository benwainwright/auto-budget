import { ENV_VAR_NAMES } from "$lib/constants";
import { getEnv } from "$lib/utils/get-env";
import type { Payment } from "../../types/payment";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocument,
  DynamoDBDocumentClient,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb"; // ES6 import

export class Data {
  public async getPayments(username: string): Promise<Payment[]> {
    const table = getEnv(ENV_VAR_NAMES.PaymentsTableName);
    const dynamo = new DynamoDBClient();
    const client = DynamoDBDocument.from(dynamo); // client is DynamoDB client

    const command = new QueryCommand({
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username,
      },
      TableName: table,
    });

    const result = await client.send(command);
    return result.Items as Payment[];
  }
}
