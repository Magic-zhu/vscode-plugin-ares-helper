
const vscode = require('vscode');
const child = require('child_process');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let createNewPage = vscode.commands.registerCommand('magic.createNewPage', function (uri) {
		vscode.window.showInformationMessage("当前文件夹的路径是" + uri.path);
	});
	let createNewComponent = vscode.commands.registerCommand('magic.createNewComponent', (uri) => {
		let path = uri.path;
		vscode.window.showInputBox("请输入名称")
			.then(value => {
				vscode.window.showWarningMessage(`正在生成,请耐心等待`)
				child.exec(`weapp create ${value} --path ${path}`, (err => {
					if (err) {
						vscode.window.showErrorMessage('错误发生')
					} else {
						vscode.window.showInformationMessage(`已完成生成`)
					}
				}))
			});
	})
	//自定义提示 代码悬停提示
	const provideCompletionItems = (document,position,token) => {
		console.log(document)
	}
	const resolveCompletionItem = () => {
		return null
	}
	let ts = vscode.languages.registerCompletionItemProvider('javascript', {
		provideCompletionItems,
		resolveCompletionItem
	},'.')
	context.subscriptions.push(createNewPage);
	context.subscriptions.push(createNewComponent);
	context.subscriptions.push(ts);
}
exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
}