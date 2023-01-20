# AWS-SAM-Api-Gateway-PartiQL-Lambda-Dynamodb-Crud
This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI). It includes the following files and folders:

- `Functions` - Contains Code for the application's Lambda function.
- `_api.yaml` - A template that defines API resources. 
- `template.yaml` - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions, an API Gateway API, and Amazon DynamoDB tables as defined in the`template.yaml` . You can update the template to add AWS resources through the same deployment process that updates your application code.

You can use the AWS ToolkitIf which is an open-source plugin for popular IDEs that uses the AWS SAM CLI to build and deploy serverless applications on AWS. as your integrated development environment (IDE) to build and test your application, 

To get started, ensure you have the following installed :
* You need to have an AWS account with administrative access. If you don’t have an AWS account, kindly use the **[link](https://aws.amazon.com/free)** to create free trial account for AWS.
* An IDE e.g [VS CODE](https://code.visualstudio.com/)
* Set up [AWS credentials](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/setup-credentials.html) in your IDE
* [AWS toolkit for VS code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/setup-toolkit.html)
* AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html). 
* Node.js - [Install Node.js 18](https://nodejs.org/en/), including the npm package management tool.
* [Postman](https://www.postman.com/) for testing the API


## Deploy the sample application

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

The API Gateway endpoint API will be displayed in the outputs when the deployment is complete.

## Use the AWS SAM CLI to build and test locally
**NOTE:** In addition to the requirements mentioned earlier, you will need to install [docker](https://docs.docker.com/desktop/install/mac-install/)

Build your application by using the `sam build` command.

```bash
appointment$ sam build
```

The AWS SAM CLI installs dependencies that are defined in `package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

The AWS SAM CLI can also emulate your application's API. Use the `sam local start-api` command to run the API locally on port 3000.

```bash
appointment$ sam local start-api
appointment$ curl http://localhost:3000/
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name appointment
```

## Resources

For an introduction to the AWS SAM specification, the AWS SAM CLI, and serverless application concepts, see the [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).
