import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';

const CaseStudiesPage = () => {
  const caseStudy = {
    title: "Leveraging Machine Learning for Early Diabetes Prediction",
    project: "Internal Research Initiative",
    sector: "Public Health & Clinical Analytics",
    tools: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Seaborn"],
    model: {
      type: "Logistic Regression",
      accuracy: "85.7%"
    },
    sections: [
      {
        title: "Overview",
        content: "Diabetes mellitus is a critical global health concern, with delayed diagnosis often leading to irreversible complications. To address this, we developed a predictive model using machine learning techniques to identify individuals at high risk of diabetes based on clinical indicators. This solution has the potential to improve early screening efforts, especially in under-resourced healthcare environments."
      },
      {
        title: "The Challenge",
        content: "Traditional diabetes screening methods can be time-consuming, costly, and inaccessible to many. The need was to design an accurate, interpretable, and scalable prediction model that healthcare providers could use to support early detection and proactive interventions."
      },
      {
        title: "Project Objectives",
        content: [
          "Develop a data-driven model to classify individuals as diabetic or non-diabetic.",
          "Identify key risk factors that contribute significantly to diabetes development.",
          "Ensure model transparency and clinical interpretability to support real-world adoption."
        ]
      },
      {
        title: "Methodology",
        content: {
          dataSource: "We utilized the well-established PIMA Indians Diabetes Dataset, comprising 768 female patients aged 21 and older.",
          variables: [
            "Glucose Concentration",
            "BMI (Body Mass Index)",
            "Age",
            "Number of Pregnancies",
            "Blood Pressure",
            "Skin Thickness",
            "Insulin Levels",
            "Diabetes Pedigree Function (genetic history)"
          ],
          process: [
            "Data Cleaning: Replaced anomalous zero values using statistical imputation.",
            "Exploratory Data Analysis: Conducted correlation and distribution analysis to understand variable significance.",
            "Model Building: Employed Logistic Regression due to its effectiveness in binary classification and interpretability.",
            "Validation: Evaluated using accuracy, confusion matrix, precision, recall, and ROC-AUC."
          ]
        }
      },
      {
        title: "Key Outcomes",
        content: {
          metrics: [
            { label: "Model Accuracy", value: "85.7%" },
            { label: "Key Predictors", value: "Glucose, BMI, Age" },
            { label: "ROC-AUC Score", value: "0.89" },
            { label: "Interpretability", value: "High (Clinician-friendly)" }
          ],
          findings: [
            "Glucose Level emerged as the most significant risk factor, followed by BMI and age.",
            "The model's performance indicates a high potential for use as a clinical decision support tool."
          ]
        }
      },
      {
        title: "Impact & Implications",
        content: [
          "Enable targeted screening for high-risk individuals.",
          "Support healthcare practitioners in decision-making.",
          "Enhance preventive care in resource-constrained settings.",
          "It can also be integrated into mobile health apps or electronic health records (EHR) systems for real-time risk assessments."
        ]
      },
      {
        title: "Future Directions",
        content: [
          "Extend to multiclass classification for diabetes stages.",
          "Integrate lifestyle data (diet, exercise, stress) for richer predictions.",
          "Deploy as a web-based or mobile screening tool."
        ]
      }
    ]
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-900 to-blue-500 min-h-screen text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{caseStudy.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant="secondary" className="bg-blue-700 text-white">
                {caseStudy.project}
              </Badge>
              <Badge variant="secondary" className="bg-blue-700 text-white">
                {caseStudy.sector}
              </Badge>
              {caseStudy.tools.map((tool, index) => (
                <Badge key={index} variant="outline" className="border-blue-400 text-blue-200">
                  {tool}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card className="bg-[#b3e5fc] border-[#4fc3f7]">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-200">Model Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">{caseStudy.model.type}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#b3e5fc] border-[#4fc3f7]">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-200">Model Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">{caseStudy.model.accuracy}</p>
                </CardContent>
              </Card>
            </div>

            {caseStudy.sections.map((section, index) => (
              <Card key={index} className="mb-6 bg-[#b3e5fc] border-[#4fc3f7]">
                <CardHeader>
                  <CardTitle className="text-xl text-[#0288d1]">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {Array.isArray(section.content) ? (
                    <ul className="list-disc list-inside space-y-2 text-[#1976d2]">
                      {section.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : typeof section.content === 'object' ? (
                    <div className="space-y-4">
                      {section.content.dataSource && (
                        <p className="text-[#1976d2]">{section.content.dataSource}</p>
                      )}
                      {section.content.variables && (
                        <div>
                          <h4 className="text-[#0288d1] font-semibold mb-2">Variables Considered:</h4>
                          <ul className="list-disc list-inside space-y-1 text-[#1976d2]">
                            {section.content.variables.map((variable, i) => (
                              <li key={i}>{variable}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {section.content.process && (
                        <div>
                          <h4 className="text-[#0288d1] font-semibold mb-2">Process Flow:</h4>
                          <ul className="list-disc list-inside space-y-1 text-[#1976d2]">
                            {section.content.process.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {section.content.metrics && (
                        <div>
                          <h4 className="text-[#0288d1] font-semibold mb-2">Metrics:</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {section.content.metrics.map((metric, i) => (
                              <div key={i} className="bg-[#b3e5fc] p-3 rounded-lg">
                                <p className="text-[#4fc3f7] text-sm">{metric.label}</p>
                                <p className="text-[#0f172a] font-semibold">{metric.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {section.content.findings && (
                        <div className="mt-4">
                          <h4 className="text-[#0288d1] font-semibold mb-2">Key Findings:</h4>
                          <ul className="list-disc list-inside space-y-1 text-[#1976d2]">
                            {section.content.findings.map((finding, i) => (
                              <li key={i}>{finding}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-[#1976d2]">{section.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}

            <Card className="mt-8 bg-[#b3e5fc] border-[#4fc3f7]">
              <CardHeader>
                <CardTitle className="text-xl text-[#0288d1]">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1976d2] mb-4">
                  Interested in deploying predictive analytics in healthcare or public health research?
                </p>
                <div className="flex items-center space-x-2 text-blue-200">
                  <Mail className="h-5 w-5" />
                  <a href="mailto:dataquestsolutions2@gmail.com" className="hover:text-[#0f172a]">
                    dataquestsolutions2@gmail.com
                  </a>
                </div>
                <p className="text-[#1976d2] mt-4">
                  Location: Kakamega, Kenya | Near MMUST
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaseStudiesPage;
